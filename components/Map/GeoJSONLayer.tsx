import { GeoJsonObject } from 'geojson';
import { GeoJSONOptions, Map, geoJSON } from 'leaflet';
import { FunctionComponent } from 'react';

interface GeoJSONLayerProps extends GeoJSONOptions {
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
