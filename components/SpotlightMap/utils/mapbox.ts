// import { getLocationIDFromGeoCode } from '.';
import { LocationData, toCamelCase } from '../../../utils';
import { Map, MapMouseEvent, MapboxGeoJSONFeature, Popup } from 'mapbox-gl';

type LocationStyle = [string | number, string];

export const getLocationStyles = (
  data?: LocationData[],
  range?: string[],
  colours?: string[],
  format?: (value: string) => string | number
): LocationStyle[] => {
  if (data && range && colours) {
    return data.map<LocationStyle>(location => {
      const locationID = format ? format(location.name) : location.name;
      const matchingRange = range.find(rng => location.value <= parseFloat(rng));

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
  format?: (value: string) => string | number;
}

export type TooltipEvent = MapMouseEvent & { features?: MapboxGeoJSONFeature[] };

const getTooltipValue = (options: TooltipOptions, location?: LocationData): string =>
  location && location.value
    ? `${options.dataPrefix}<span style="font-size: 1em; font-weight: 700; color:#EA7600">${location.value.toFixed(
        1
      )}</span>${options.dataSuffix}`
    : 'No Data';

export const renderTooltip = (map: Map, event: TooltipEvent, options: TooltipOptions): void => {
  const { popup, nameProperty, data, format } = options;
  if (event.features && event.features[0].properties) {
    const geometry = event.features?.[0].geometry;
    if (geometry.type === 'Polygon') {
      const locationName = event.features[0].properties[nameProperty];
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
              <div style="font-size:1.6rem;padding-bottom:5px;font-weight:700;text-align:center">${toCamelCase(
                locationName
              )}</div>
              <em style="font-size:1.4rem;">${getTooltipValue(options, location)}</em>
            </div>
          `
          )
          .addTo(map);
      }
    }
  }
};
