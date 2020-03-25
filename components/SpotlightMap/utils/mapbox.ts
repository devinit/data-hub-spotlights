import { Map, MapboxGeoJSONFeature, MapMouseEvent, Popup } from 'mapbox-gl';
import { LocationData } from '../../../utils';

type LocationStyle = [string | number, string];

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

interface TooltipOptions {
  popup: Popup;
  nameProperty: string;
  data: LocationData[];
  dataPrefix?: string;
  dataSuffix?: string;
  formatter?: (value: string) => string | number;
}

export type TooltipEvent = MapMouseEvent & { features?: MapboxGeoJSONFeature[] };

const getTooltipValue = (options: TooltipOptions, location?: LocationData): string =>
  location && location.value
    ? `${options.dataPrefix}<span style="font-size: 1em; font-weight: 700; color:#EA7600">${location.value.toFixed(
        1
      )}</span>${options.dataSuffix}`
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

export const renderTooltip = (map: Map, event: TooltipEvent, options: TooltipOptions): void => {
  const { popup, nameProperty, data, formatter: format } = options;
  const locationName = getLocationNameFromEvent(event, nameProperty);
  if (locationName) {
    const location = data.find(_location => {
      const name = format ? format(_location.name) : _location.name;
      return locationName === name;
    });
    popup
      .setLngLat(event.lngLat)
      .setHTML(
        `
        <div style="white-space: nowrap;">
          <div style="font-size:1.6rem;padding-bottom:5px;font-weight:700;text-align:center;text-transform:capitalize;">
            ${locationName.toLowerCase()}
          </div>
          <em style="font-size:1.4rem;">${getTooltipValue(options, location)}</em>
        </div>
      `
      )
      .addTo(map);
  }
};
