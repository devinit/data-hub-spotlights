import React, { FunctionComponent, useEffect, useRef } from 'react';
import mapbox from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface BaseMapProps {
  accessToken: string;
  width?: string;
  height?: string;
  background?: string;
  options: Partial<mapbox.MapboxOptions>;
  showNavigationControls?: boolean;
}

const BaseMap: FunctionComponent<BaseMapProps> = props => {
  mapbox.accessToken = props.accessToken;
  const mapNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapNode && mapNode.current) {
      const map = new mapbox.Map({
        container: mapNode.current,
        ...props.options
      });

      if (props.showNavigationControls) {
        map.addControl(new mapbox.NavigationControl());
      }
    }
  }, []);

  return (
    <div ref={ mapNode } style={ { width: props.width, height: props.height } }>
      <style jsx>{ `
        background: ${props.background};
      ` }</style>
    </div>
  );
};

BaseMap.defaultProps = {
  width: '940px', // spotlights default
  height: '596px', // spotlights default
  background: '#D3E0F4', // spotlights default
  options: {
    minZoom: 6,
    zoom: 6.1
  },
  showNavigationControls: true
};

export { BaseMap };
