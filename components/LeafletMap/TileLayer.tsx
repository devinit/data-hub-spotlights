import { FunctionComponent } from 'react';
import { Map, TileLayerOptions, tileLayer } from 'leaflet';

interface TileLayerProps extends TileLayerOptions {
  url: string;
  map?: Map;
}

const TileLayer: FunctionComponent<TileLayerProps> = (props) => {
  const { map, url, ...options } = props;
  if (map) {
    tileLayer(url, { ...options }).addTo(map);
  }

  return null;
};

export { TileLayer };
