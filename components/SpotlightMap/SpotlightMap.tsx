import { Feature, Geometry } from 'geojson';
import { LatLng } from 'leaflet';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Loading } from '../Loading';
import { GeoJSONLayer, Map } from '../Map';
import {
  GeoJSONProperties,
  SpotlightMapGeoJSON,
  SpotlightMapProps,
  defaultMapStyle,
  extractLocationsFromGeoJSON,
  filterGeoJSONByLevel,
  getFillColor
} from './utils';

const SpotlightMap: FunctionComponent<SpotlightMapProps> = props => {
  const { countryCode, center, levels, zoom, onLoad, data, colours, range } = props;
  const [ loading, setLoading ] = useState<boolean>(!!props.loading);
  const [ geojson, setGeoJSON ] = useState<SpotlightMapGeoJSON>({});

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

  const styleMap = (feature: Feature<Geometry, GeoJSONProperties> | undefined) => {
    if (feature && feature.properties) {
      const { properties } = feature;

      return {
        ...defaultMapStyle,
        fillColor: getFillColor(properties.geocode, data && data.data, range, colours)
      };
    }

    return defaultMapStyle;
  };

  return (
    <Loading active={ loading }>
      <Map center={ center && new LatLng(center[0], center[1]) } zoom={ zoom || 6.8 } height="100%" minZoom={ 6.5 }>
        <GeoJSONLayer
          geojson={ geojson.filtered || geojson.all }
          style={ styleMap }
        />
      </Map>
    </Loading>
  );
};

SpotlightMap.defaultProps = {
  levels: [ 1 ],
  loading: false
};

export { SpotlightMap };
