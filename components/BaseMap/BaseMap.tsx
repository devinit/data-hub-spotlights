import React, {
  FunctionComponent,
  useEffect,
  useRef,
  Children,
  ReactNode,
  isValidElement,
  cloneElement,
  useState,
} from 'react';
import mapbox, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BaseMapLayer } from './BaseMapLayer';

export interface CoreMapProps {
  accessToken: string;
  style?: React.CSSProperties;
  background?: string;
  showNavigationControls?: boolean;
  onLoad?: (map: mapbox.Map, event: mapbox.MapboxEvent) => void;
}
interface BaseMapProps extends CoreMapProps {
  options: Partial<mapbox.MapboxOptions>;
}

const defaultStyles: React.CSSProperties = {
  width: '100%', // spotlights default
  position: 'absolute',
  top: 0,
  bottom: 0,
  background: '#F3F3F3', // spotlights default
};

const BaseMap: FunctionComponent<BaseMapProps> = (props) => {
  mapbox.accessToken = props.accessToken;
  const mapNode = useRef<HTMLDivElement>(null);
  const [baseMap, setBaseMap] = useState<Map | undefined>(undefined);

  useEffect(() => {
    if (mapNode && mapNode.current) {
      const map = new mapbox.Map({
        container: mapNode.current,
        ...props.options,
      });

      if (props.showNavigationControls) {
        map.addControl(new mapbox.NavigationControl());
      }

      map.on('load', (event) => {
        setBaseMap(map);
        if (props.onLoad) {
          props.onLoad(map, event);
        }
      });
    }
  }, []);

  const renderLayers = (): ReactNode => {
    return Children.map(props.children, (child) => {
      if (isValidElement(child) && child.type === BaseMapLayer) {
        return cloneElement(child, { map: baseMap });
      }
    });
  };

  return (
    <div ref={mapNode} style={{ ...defaultStyles, ...props.style }}>
      {renderLayers()}
      <style jsx>{`
        background: ${props.background};
        font-family: geomanist, sans-serif;

        div :global(.mapboxgl-canary) {
          background: red;
        }

        div :global(.mapboxgl-popup) {
          z-index: 400;
          max-width: 100% !important;
        }

        div :global(.mapboxgl-popup-content) {
          background-color: rgba(0, 0, 0, 0.9) !important;
          box-shadow: none !important;
          color: #ffffff !important;
          font-family: geomanist, sans-serif;
          -webkit-tap-highlight-color: black;
          opacity: 0.8;
          padding: 20px;
        }

        div :global(.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip) {
          border-top-color: rgba(0, 0, 0, 0.9);
          opacity: 0.8;
        }

        div :global(.mapboxgl-popup-content .mapBox-popup p) {
          margin-bottom: 0;
        }

        div :global(.mapboxgl-popup-content .mapboxgl-popup-close-button) {
          color: #ffffff;
          font-size: 1.8rem;
        }
      `}</style>
    </div>
  );
};

BaseMap.defaultProps = {
  style: defaultStyles,
  options: {
    minZoom: 6,
    zoom: 6.1,
  },
  showNavigationControls: true,
  background: 'inherit',
};

export { BaseMap };
