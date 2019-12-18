import React, { FunctionComponent } from 'react';
import { BaseMap, CoreMapProps } from '../BaseMap';
import { MapboxOptions } from 'mapbox-gl';

interface MapUgandaProps extends CoreMapProps {
  style?: string;
  minZoom?: number;
  maxZoom?: number;
  zoom?: number;
}

const MapUganda: FunctionComponent<MapUgandaProps> = props => {
  const baseMapOptions: Partial<MapboxOptions> = {
    style: props.style,
    center: [ 32.655221, 1.344666 ],
    minZoom: props.minZoom,
    maxZoom: props.maxZoom,
    zoom: props.zoom
  };

  return (
    <BaseMap
      accessToken={ props.accessToken }
      options={ baseMapOptions }
      onLoad={ props.onLoad }
    />
  );
};

MapUganda.defaultProps = {
  style: 'mapbox://styles/edwinmp/ck42rrx240t8p1cqpkhgy2g0m',
  minZoom: 6,
  zoom: 6.1
};

export { MapUganda };
