import { Map, MapOptions, map as leafletMap } from 'leaflet';
import React, {
  Children,
  FunctionComponent,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { GeoJSONLayer } from './GeoJSONLayer';
import { TileLayer } from './TileLayer';

interface MapProps extends MapOptions {
  onCreate?: (map: Map) => void;
  width?: string;
  height?: string;
}

const LeafletMap: FunctionComponent<MapProps> = ({ children, onCreate, width, height, ...mapOptions }) => {
  const [map, setMap] = useState<Map | undefined>(undefined);
  const mapRef = useRef<HTMLDivElement>(null);
  const renderLayers = (): ReactNode => {
    return Children.map(children, (child) => {
      if (isValidElement(child) && (child.type === TileLayer || child.type === GeoJSONLayer)) {
        return cloneElement(child, { map });
      }
    });
  };
  useEffect(() => {
    if (mapRef && mapRef.current) {
      const _map = leafletMap(mapRef.current, mapOptions);
      if (onCreate) {
        onCreate(_map);
      }
      setMap(_map);
    }
  }, []);

  return (
    <div ref={mapRef} style={{ width, height }}>
      {renderLayers()}
    </div>
  );
};

LeafletMap.defaultProps = {
  width: '100%',
  height: '600px',
  zoom: 7,
};

export { LeafletMap };
