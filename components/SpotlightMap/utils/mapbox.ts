// import { getLocationIDFromGeoCode } from '.';
import { LocationData } from '../../../utils';

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
