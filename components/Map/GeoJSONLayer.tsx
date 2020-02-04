import { GeoJsonObject } from 'geojson';
import { GeoJSONOptions, Map, geoJSON } from 'leaflet';
import { FunctionComponent } from 'react';
import { GeoJSONProperties } from '../SpotlightMap/utils/types';

interface GeoJSONLayerProps extends GeoJSONOptions<GeoJSONProperties> {
  geojson?: GeoJsonObject;
  map?: Map;
}

const GeoJSONLayer: FunctionComponent<GeoJSONLayerProps> = ({ map, geojson, ...options }) => {
  if (map) {
    geoJSON(geojson, { ...options }).addTo(map);
  }

  return null;
};

export { GeoJSONLayer };
