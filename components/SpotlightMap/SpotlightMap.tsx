import { FeatureCollection, MultiPolygon } from 'geojson';
import { LatLng, Map as LeafletMap } from 'leaflet';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { GeoJSONLayer, Map, TileLayer } from '../Map';

interface SpotlightMapProps {
  center?: number[];
  zoom?: number;
  countryCode: string;
  levels?: number[];
}

interface SpotlightMapGeoJSON {
  all?: SpotlightFC;
  filtered?: SpotlightFC;
}

interface GeoJSONProperties {
  geocode: string;
}

type SpotlightFC = FeatureCollection<MultiPolygon, GeoJSONProperties>;

const filterGeoJSONByLevel = (geojson: SpotlightFC, levels: number[]): SpotlightFC => ({
  ...geojson,
  features: levels.length
    ? geojson.features.filter(feature => {
      const level = feature.properties.geocode.split('.').length - 1;

      return levels.indexOf(level) > -1;
    })
    : geojson.features
});

const SpotlightMap: FunctionComponent<SpotlightMapProps> = ({ countryCode, center, levels, zoom }) => {
  const [ map, setMap ] = useState<LeafletMap | undefined>(undefined);
  const [ geojson, setGeoJSON ] = useState<SpotlightMapGeoJSON>({});
  const onCreate = (mapInstance: LeafletMap) => setMap(mapInstance);
  console.log(map);

  useEffect(() => {
    import(`./geojson/${countryCode}`)
      .then(all => setGeoJSON({ all, filtered: filterGeoJSONByLevel(all, levels || []) }))
      .catch(error => console.log(error));
  }, [ countryCode ]);
  useEffect(() => {
    if (geojson.all) {
      setGeoJSON({ ...geojson, filtered: filterGeoJSONByLevel(geojson.all, levels || []) });
    }
  }, [ levels ]);

  return (
      <Map onCreate={ onCreate } center={ center && new LatLng(center[0], center[1]) } zoom={ zoom }>
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
