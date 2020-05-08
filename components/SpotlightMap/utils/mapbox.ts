import center from '@turf/center';
import { Feature, featureCollection, point, Point, Position, Properties } from '@turf/helpers';
import { LngLat, Map, MapboxGeoJSONFeature, MapMouseEvent, Popup } from 'mapbox-gl';
import { formatNumber, LocationData } from '../../../utils';
import { FormatterTarget, LayerConfig } from './config';

type LocationStyle = [string | number, string];

export const COLOURED_LAYER = 'highlight';

export const setZoomByContainerWidth = (map: Map, container: HTMLElement, options: LayerConfig): void => {
  if (container.clientWidth < 700) {
    map.setZoom(options.zoom ? options.zoom - 1 : 5);
  } else if (container.clientWidth < 900) {
    map.setZoom(options.minZoom ? options.minZoom + 0.8 : 5.8);
  } else {
    map.setZoom(options.zoom || 6.1);
  }
};

export const getProperLocationName = (
  locationName: string,
  formatter?: (value: string) => string | number
): string | number => (formatter ? formatter(locationName) : locationName);

export const getLocationStyles = (
  data?: LocationData[],
  range?: string[],
  colours?: string[],
  format?: (value: string) => string | number
): LocationStyle[] => {
  if (data && range && colours) {
    return data.map<LocationStyle>(location => {
      const locationID = getProperLocationName(location.name, format);
      const matchingRange = range.find(rng => location.value !== null && location.value <= parseFloat(rng));

      if (matchingRange) {
        return [locationID, colours[range.indexOf(matchingRange)]];
      } else if (location.value > parseFloat(range[range.length - 1])) {
        return [locationID, colours[colours.length - 1]];
      }

      return [locationID, '#b3adad'];
    });
  }

  return [];
};

export interface TooltipOptions {
  popup: Popup;
  nameProperty: string;
  data: LocationData[];
  dataPrefix?: string;
  dataSuffix?: string;
  formatter?: (value: string, target?: FormatterTarget) => string | number;
}

export type TooltipEvent = MapMouseEvent & { features?: MapboxGeoJSONFeature[] };

const getTooltipValue = (options: TooltipOptions, location?: LocationData): string =>
  location && typeof location.value === 'number'
    ? `${options.dataPrefix || ''}<span style="font-size: 1em; font-weight: 700; color:#EA7600">${formatNumber(
        location.value
      )}</span>${options.dataSuffix || ''}`
    : 'No Data';

export const getLocationNameFromEvent = (event: TooltipEvent, nameProperty: string): string | null => {
  if (event.features && event.features[0].properties) {
    const geometry = event.features[0].geometry;
    if (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon') {
      const locationName = event.features[0].properties[nameProperty];

      return locationName || null;
    }
  }

  return null;
};

const getCoordinatesCenter = (coordinates: Position[]): Feature<Point, Properties> => {
  const features = featureCollection(coordinates.map(position => point(position)));

  return center(features);
};

const getLngLatFromFeature = (feature: Feature<Point, Properties>): LngLat | null => {
  const position = feature.geometry?.coordinates;

  return position ? new LngLat(position[0], position[1]) : null;
};

const getPosition = ({ geometry }: MapboxGeoJSONFeature): LngLat | null => {
  if (geometry) {
    if (geometry.type === 'Polygon') {
      const feature = getCoordinatesCenter(geometry.coordinates[0]);

      return getLngLatFromFeature(feature);
    }
    if (geometry.type === 'MultiPolygon') {
      const positions = geometry.coordinates[0][0];
      const feature = getCoordinatesCenter(positions);

      return getLngLatFromFeature(feature);
    }
  }

  return null;
};

export const getPositionFromLocationName = (map: Map, locationName: string, options: LayerConfig): LngLat | null => {
  const features = map.querySourceFeatures('composite', {
    sourceLayer: options.sourceLayer,
    filter: ['in', options.nameProperty, getProperLocationName(locationName, options.formatter)]
  });

  return features && features.length ? getPosition(features[0]) : null;
};

export const flyToLocation = (map: Map, locationName: string, options: LayerConfig, recenter = true): Promise<LngLat> =>
  new Promise((resolve, reject) => {
    const position = getPositionFromLocationName(map, locationName, options);
    if (position) {
      map.flyTo({
        center: position,
        zoom: 16
      });
      resolve(position);
    } else if (recenter) {
      // reset view before next flyTo, otherwise flying to locations not currently visible shall fail
      map.flyTo({ center: options.center, zoom: options.zoom || 6.1 });
      setTimeout(() => {
        flyToLocation(map, locationName, options, false)
          .then(position => resolve(position))
          .catch(reject);
      }, 500);
    } else {
      reject(`Location ${locationName} not found!`);
    }
  });

export const renderPopup = (map: Map, popup: Popup, position: LngLat, locationName: string, value: string): Popup =>
  popup
    .setLngLat(position)
    .setHTML(
      `
        <div style="white-space: nowrap;">
          <div style="font-size:1.6rem;padding-bottom:5px;font-weight:700;text-align:center;text-transform:capitalize;">
            ${locationName.toLowerCase()}
          </div>
          <em style="font-size:1.4rem;">${value}</em>
        </div>
      `
    )
    .addTo(map);

const findLocationData = (
  locationName: string,
  data: LocationData[],
  formatter?: (value: string) => string | number
): LocationData | undefined =>
  data.find(location => {
    const name = formatter ? formatter(location.name) : location.name;

    return locationName.toLowerCase() === `${name}`.toLowerCase();
  });

export const renderTooltipFromEvent = (map: Map, event: TooltipEvent, options: TooltipOptions): void => {
  const { popup, nameProperty, formatter, data } = options;
  const locationName = getLocationNameFromEvent(event, nameProperty);
  if (locationName) {
    const boundaryName = formatter ? (formatter(locationName, 'tooltip') as string) : locationName;
    const location = findLocationData(boundaryName, data);
    renderPopup(map, popup, event.lngLat, boundaryName, getTooltipValue(options, location));
  }
};

export const renderTooltipFromLocation = (
  map: Map,
  locationName: string,
  config: LayerConfig,
  options: TooltipOptions
): void => {
  const { popup, data } = options;
  const position = getPositionFromLocationName(map, locationName, config);
  if (position) {
    const location = findLocationData(locationName, data);
    renderPopup(map, popup, position, locationName, getTooltipValue(options, location));
  }
};
