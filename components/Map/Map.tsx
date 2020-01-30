import { LatLng, Map as LeafletMap, map as leafletMap } from 'leaflet';
import React, { Children, FunctionComponent, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import { GeoJSONLayer } from './GeoJSONLayer';
import { TileLayer } from './TileLayer';

interface MapProps {
  onCreate: (map: LeafletMap) => void;
  width?: string;
  height?: string;
  center?: LatLng;
  zoom?: number;
}

const Map: FunctionComponent<MapProps> = ({ children, onCreate, width, height, center, zoom }) => {
  const [ map, setMap ] = useState<LeafletMap | undefined>(undefined);
  const mapRef = useRef<HTMLDivElement>(null);
  const renderLayers = () => {
    return Children.map(children, child => {
      if (isValidElement(child) && (child.type === TileLayer || child.type === GeoJSONLayer)) {
        return cloneElement(child, { map });
      }
    });
  };
  useEffect(() => {
    if (mapRef && mapRef.current) {
      const _map = leafletMap(mapRef.current, { center, zoom });
      onCreate(_map);
      setMap(_map);
    }
  }, []);

  return <div ref={ mapRef } style={ { width, height } }>{ renderLayers() }</div>;
};

Map.defaultProps = {
  width: '100%',
  height: '600px',
  zoom: 7
};

export { Map };
