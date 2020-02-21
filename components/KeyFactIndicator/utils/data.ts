import { LocationData } from '../../../utils';
import { ReactText } from 'react';

const DEFAULT_VALUE = 'No Data';

export const getValue = (data?: LocationData[], aggregation?: string): string | number => {
  if (data && data.length) {
    if (data.length === 1 && data[0].value) {
      return data[0].value.toFixed(2);
    }
    // if no aggregation is specified, use the value of the most recent year
    if (!aggregation) {
      const sortedData = data.sort((a, b) => a.year - b.year);
      if (sortedData[data.length - 1].value) {
        return sortedData[data.length - 1].value.toFixed(2);
      }
    }
  }

  return DEFAULT_VALUE;
};

export const formatValue = (
  data?: LocationData[],
  prefix?: string,
  suffix?: string,
  aggregation?: string
): ReactText => {
  const value = getValue(data, aggregation);

  return value !== DEFAULT_VALUE ? `${prefix || ''} ${value} ${suffix || ''}` : value;
};
