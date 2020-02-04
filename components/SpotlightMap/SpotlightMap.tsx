import { Feature, FeatureCollection, Geometry, MultiPolygon } from 'geojson';
import { groupBy } from 'underscore';
import { LatLng } from 'leaflet';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { GeoJSONLayer, Map, TileLayer } from '../Map';
import { Loading } from '../Loading';

interface SpotlightMapProps {
  center?: number[];
  zoom?: number;
  countryCode: string;
  levels?: number[];
  onLoad?: (data: MapLocations) => void;
}

interface SpotlightMapGeoJSON {
  all?: SpotlightFC;
  filtered?: SpotlightFC;
}

interface GeoData {
  geocode: string;
  name: string;
}

interface GeoJSONProperties extends GeoData {
  region?: string;
  geometry: Geometry;
}

type SpotlightFC = FeatureCollection<MultiPolygon, GeoJSONProperties>;

export interface MapLocations {
  regional: {
    [key: string]: GeoData[]
  };
  other: GeoData[];
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

const SpotlightMap: FunctionComponent<SpotlightMapProps> = ({ countryCode, center, levels, zoom, onLoad }) => {
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ geojson, setGeoJSON ] = useState<SpotlightMapGeoJSON>({});

  useEffect(() => {
    import(`./geojson/${countryCode}`)
      .then(all => {
        setGeoJSON({ all, filtered: filterGeoJSONByLevel(all, levels || []) });
        setLoading(false);
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

  if (loading) {
    return <Loading/>;
  }

  return (
      <Map center={ center && new LatLng(center[0], center[1]) } zoom={ zoom } height="100%">
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
  levels: [ 1 ]
};

export { SpotlightMap };
