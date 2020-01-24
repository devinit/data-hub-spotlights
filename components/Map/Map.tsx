import React, { useEffect } from 'react';
import L from 'leaflet';

interface MapProps {
  saveMapState: (leafletObject: any, map: L.Map) => void;
  width?: string;
  height?: string;
  mapCenter?: L.LatLng;
  zoom?: number;
  layers: L.TileLayer[];
  mapID: string;
}

const Map = ({ saveMapState, width, height, layers, mapCenter, zoom, mapID }: MapProps) => {
  useEffect(() => {
    // create map
    const map = L.map(mapID, {
      center: mapCenter,
      zoom,
      layers
    });
    saveMapState(L, map);
  }, []);

  return <div id={ mapID } style={ { width, height } } />;
};

Map.defaultProps = {
  width: '100%',
  height: '600px',
  zoom: 7
};

export { Map };
