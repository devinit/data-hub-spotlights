import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { BaseMap, BaseMapLayer } from '../BaseMap';
import { Loading } from '../Loading';
import { config, getLocationStyles, SpotlightMapProps } from './utils';

const SpotlightMap: FunctionComponent<SpotlightMapProps> = props => {
  const { countryCode, level, data, dataLoading, range, colours } = props;
  const { layers } = config[countryCode];
  const options = level && level <= layers.length ? layers[level] : layers[0];
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
  }, [countryCode]);

  const renderLayers = (): ReactNode => {
    if (!dataLoading && data && data[0].data.length) {
      return (
        <BaseMapLayer
          id="highlight"
          source="composite"
          source-layer={options.source}
          maxzoom={options.maxZoom && options.maxZoom + 1}
          type="fill"
          paint={{
            'fill-color': {
              property: options.nameProperty,
              type: 'categorical',
              default: '#b3adad',
              stops: getLocationStyles(data[0].data, range, colours, options.format)
            },
            'fill-opacity': 0.75,
            'fill-outline-color': '#ffffff'
          }}
        />
      );
    }

    return <BaseMapLayer id="highlight" show={false} />;
  };

  return (
    <Loading active={loading || !!dataLoading}>
      <BaseMap
        accessToken="pk.eyJ1IjoiZWR3aW5tcCIsImEiOiJjazFsdHVtcG0wOG9mM2RueWJscHhmcXZqIn0.cDR43UvfMaOY9cNJsEKsvg"
        options={{
          style: options.style,
          center: options.center,
          minZoom: options.minZoom || 6,
          zoom: options.zoom || 6.1,
          maxZoom: options.maxZoom || 7
        }}
        width="100%"
        height="100%"
      >
        {renderLayers()}
      </BaseMap>
    </Loading>
  );
};

SpotlightMap.defaultProps = {
  level: 0,
  dataLoading: false
};

export { SpotlightMap };
