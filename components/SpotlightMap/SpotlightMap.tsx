import { Feature, FeatureCollection, Geometry, MultiPolygon } from 'geojson';
import { LatLng, Map as LeafletMap } from 'leaflet';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { groupBy } from 'underscore';
import { LocationIndicatorData, SpotlightLocation } from '../../utils';
import { Loading } from '../Loading';
import { GeoJSONLayer, Map, TileLayer } from '../Map';

interface SpotlightMapProps {
  center?: number[];
  zoom?: number;
  countryCode: string;
  levels?: number[];
  loading?: boolean;
  data?: LocationIndicatorData;
  onLoad?: (data: MapLocations) => void;
}

interface SpotlightMapGeoJSON {
  all?: SpotlightFC;
  filtered?: SpotlightFC;
}

interface GeoJSONProperties extends SpotlightLocation {
  region?: string;
  geometry: Geometry;
}

type SpotlightFC = FeatureCollection<MultiPolygon, GeoJSONProperties>;

export interface MapLocations {
  regional: {
    [key: string]: SpotlightLocation[]
  };
  other: SpotlightLocation[];
}

const filterGeoJSONByLevel = (geojson: SpotlightFC, levels: number[]): SpotlightFC => ({
  ...geojson,
  features: levels.length
    ? geojson.features.filter(feature => {
      const level = feature.properties.geocode.split('.').length - 1;

      return levels.indexOf(level) > -1;
    })
    : geojson.features
});

const extractLocationsFromGeoJSON = (geojson: Feature<MultiPolygon, GeoJSONProperties>[]): MapLocations => {
  const locations = geojson.map(({ properties }) => {
    const { geometry, ...data } = properties;

    return data;
  });
  const { undefined: other, ...regional } = groupBy(locations, location => location.region);

  return { regional, other };
};

const SpotlightMap: FunctionComponent<SpotlightMapProps> = props => {
  const { countryCode, center, levels, zoom, onLoad, data } = props;
  const [ loading, setLoading ] = useState<boolean>(!!props.loading);
  const [ geojson, setGeoJSON ] = useState<SpotlightMapGeoJSON>({});
  const [ leafletMap, setLeafletMap ] = useState<LeafletMap | undefined>(undefined);

  useEffect(() => setLoading(!!props.loading), [ props.loading ]);

  useEffect(() => {
    setLoading(true);
    import(`./geojson/${countryCode}`)
      .then(all => {
        setGeoJSON({ all, filtered: filterGeoJSONByLevel(all, levels || []) });
        setLoading(!!props.loading);
        if (onLoad) {
          onLoad(extractLocationsFromGeoJSON(all.features));
        }
      })
      .catch(error => console.log(error));
  }, [ countryCode ]);

  useEffect(() => {
    if (geojson.all) {
      setGeoJSON({ ...geojson, filtered: filterGeoJSONByLevel(geojson.all, levels || []) });
    }
  }, [ levels ]);

  useEffect(() => {
    console.log(leafletMap);
    console.log(data);
  }, [ data ]);

  const onMapCreate = (map: LeafletMap) => setLeafletMap(map);

  if (loading) {
    return <Loading/>;
  }

  return (
      <Map center={ center && new LatLng(center[0], center[1]) } zoom={ zoom } height="100%" onCreate={ onMapCreate }>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/davidserene/ck56hj7h10o861clbgsqu7h88/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGF2aWRzZXJlbmUiLCJhIjoiUkJkd1hGWSJ9.SCxMvCeeovv99ZDnpfpNwA"
          attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
        />
        <GeoJSONLayer
          geojson={ geojson.filtered || geojson.all }
          style={ {
            color: '#ffffff',
            weight: 0.6,
            fillOpacity: 1,
            fillColor: '#D0CCCF'
          } }
        />
      </Map>
  );
};

SpotlightMap.defaultProps = {
  levels: [ 1 ],
  loading: false
};

export { SpotlightMap };
