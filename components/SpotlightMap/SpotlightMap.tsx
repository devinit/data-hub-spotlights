import { Map, MapboxEvent, Popup } from 'mapbox-gl';
import React, { FunctionComponent, ReactNode, useContext, useEffect, useState } from 'react';
import { debounce } from 'underscore';
import { CountryContext, LocationData, extractRelevantDataByBudgetType } from '../../utils';
import { BaseMap, BaseMapLayer } from '../BaseMap';
import { Loading } from '../Loading';
import {
  getLocationNameFromEvent,
  getLocationStyles,
  getProperLocationName,
  renderTooltipFromEvent,
  TooltipEvent,
  flyToLocation,
  COLOURED_LAYER,
  setZoomByContainerWidth,
  renderTooltipFromLocation,
  TooltipOptions,
} from './utils/mapbox';
import { SpotlightMapProps, config, LayerConfig } from './utils';

const getTooltipOptions = (
  popup: Popup,
  data: LocationData[],
  props: SpotlightMapProps,
  configs: LayerConfig
): TooltipOptions => ({
  nameProperty: configs.nameProperty,
  popup,
  data,
  dataPrefix: props.dataPrefix,
  dataSuffix: props.dataSuffix,
  formatter: configs.formatter,
});

const SpotlightMap: FunctionComponent<SpotlightMapProps> = (props) => {
  const { level, data, dataLoading, range, colours, location } = props;
  const { countryCode } = useContext(CountryContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [map, setMap] = useState<Map | undefined>(undefined);
  const { layers } = config[countryCode];
  const options = { ...(level && level <= layers.length ? layers[level] : layers[0]), ...props.layerConfig };
  const locationData = data ? extractRelevantDataByBudgetType(data[0].data) : [];

  const showPopup = (popup: Popup, map: Map, event: TooltipEvent): void => {
    renderTooltipFromEvent(map, event, getTooltipOptions(popup, locationData, props, options));
  };

  useEffect(() => {
    if (map) {
      let timeoutID: number;
      let popup = new Popup({ offset: 5 });
      const onHover = (event: TooltipEvent): void => {
        map.getCanvas().style.cursor = 'pointer';
        showPopup(popup, map, event);
      };
      const onBlur = (): void => {
        map.getCanvas().style.cursor = '';
        if (!location) {
          popup.remove();
        }
      };

      map.on('mousemove', COLOURED_LAYER, onHover);
      map.on('mouseleave', COLOURED_LAYER, onBlur);

      const onClick = (event: TooltipEvent): void => {
        const locationName = getLocationNameFromEvent(event, options.nameProperty);
        if (!location) {
          if (locationName) {
            if (props.onClick) {
              props.onClick(options.formatter ? (options.formatter(locationName, 'boundary') as string) : locationName);
            } else {
              flyToLocation(map, locationName, options);
            }
          }
        } else {
          if (locationName) {
            flyToLocation(map, locationName, options);
          }
          if (popup.isOpen()) {
            popup.remove();
          }
          popup = new Popup({ offset: 5 });
          showPopup(popup, map, event);
        }
      };
      const onDoubleClick = (): void => {
        if (props.onClick) {
          props.onClick();
        }
      };
      const onResize = debounce((event: MapboxEvent) => {
        const container = event.target.getContainer();
        setZoomByContainerWidth(map, container, options);
        onResize.cancel();
      }, 300);

      map.on('click', COLOURED_LAYER, onClick);
      map.on('dblclick', COLOURED_LAYER, onDoubleClick);
      map.on('resize', onResize);

      if (!loading && location && data) {
        timeoutID = setTimeout(() => {
          const locationName = options.formatter
            ? (options.formatter(location?.name as string, 'tooltip') as string)
            : (location?.name as string);
          renderTooltipFromLocation(map, locationName, options, getTooltipOptions(popup, locationData, props, options));
        }, 1000);
      }

      return (): void => {
        map.off('mousemove', COLOURED_LAYER, onHover);
        map.off('mouseleave', COLOURED_LAYER, onBlur);
        map.off('click', COLOURED_LAYER, onClick);
        map.off('dblclick', COLOURED_LAYER, onDoubleClick);
        map.off('resize', onResize);
        popup.remove();
        if (timeoutID) {
          clearTimeout(timeoutID);
        }
      };
    }
  }, [map, loading, data]);
  useEffect(() => {
    if (map) {
      if (!location) {
        map.setCenter(options.center).setZoom(options.zoom || 6.1);
      }
    }
  }, [location]);
  useEffect(() => {
    if (map && props.hideParentLayer && map.getLayer(options.layerName)) {
      map.setLayoutProperty(options.layerName, 'visibility', 'none');
    }
  });

  const onLoad = (_map: Map): void => {
    setLoading(false);
    setMap(_map);
    setZoomByContainerWidth(_map, _map.getContainer(), options);
    if (props.onLoad) {
      props.onLoad(_map);
    }
  };
  const onAddLayer = (_map: Map, layerID: string): void => {
    if (location) {
      _map.setFilter(layerID, ['==', options.nameProperty, getProperLocationName(location.name, options.formatter)]);
      _map.setPaintProperty(options.layerName, 'fill-color', '#d1d1d1');
      if (props.locationHandling === 'flyto') {
        setTimeout(() => {
          const locationName = options.formatter ? options.formatter(location?.name as string) : location?.name;
          flyToLocation(_map, locationName as string, options);
        }, 500);
      }
    }
  };

  const renderLayers = (): ReactNode => {
    if (!dataLoading && locationData.length) {
      return (
        <BaseMapLayer
          id={COLOURED_LAYER}
          source="composite"
          source-layer={options.sourceLayer}
          maxzoom={options.maxZoom && options.maxZoom + 1}
          type="fill"
          paint={{
            'fill-color': {
              property: options.nameProperty,
              type: 'categorical',
              default: '#D1CBCF',
              stops: getLocationStyles(locationData, range, colours, options.formatter),
            },
            'fill-opacity': 0.75,
            'fill-outline-color': '#ffffff',
          }}
          onAdd={onAddLayer}
        />
      );
    }

    return (
      <BaseMapLayer
        id={COLOURED_LAYER}
        source="composite"
        source-layer={options.sourceLayer}
        maxzoom={options.maxZoom && options.maxZoom + 1}
        type="fill"
        paint={{
          'fill-color': '#D1CBCF',
          'fill-opacity': 0.75,
          'fill-outline-color': '#ffffff',
        }}
        onAdd={onAddLayer}
      />
    );
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
          maxZoom: options.maxZoom || 7,
          scrollZoom: false,
        }}
        style={{ width: '100%', background: '#ffffff' }}
        onLoad={onLoad}
      >
        {renderLayers()}
      </BaseMap>
    </Loading>
  );
};

SpotlightMap.defaultProps = {
  level: 0,
  dataLoading: false,
  locationHandling: 'highlight-only',
};

export { SpotlightMap };
