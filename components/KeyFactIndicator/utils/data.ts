import { LocationData, LocationDataMeta } from '../../../utils';
import { ReactText } from 'react';

export interface ValueOptions {
  useLocalValue?: boolean;
  aggregation?: string;
  prefix?: string;
  suffix?: string;
}

const DEFAULT_VALUE = 'No Data';

const getLocalValue = (data: LocationData): string | number => {
  if (data.meta) {
    const meta: LocationDataMeta = JSON.parse(data.meta);
    if (meta.valueLocalCurrency) {
      return meta.valueLocalCurrency.toFixed(2);
    }
  }

  return data.value.toFixed(2);
};

export const getValue = (data?: LocationData[], options: ValueOptions = {}): string | number => {
  if (data && data.length) {
    if (data.length === 1 && data[0].value) {
      if (options.useLocalValue) {
        return getLocalValue(data[0]);
      }
      return data[0].value.toFixed(2);
    }
    // if no aggregation is specified, use the value of the most recent year
    if (!options.aggregation) {
      const sortedData = data.sort((a, b) => a.year - b.year);
      if (sortedData[data.length - 1].value) {
        return sortedData[data.length - 1].value.toFixed(2);
      }
    }
  }

  return DEFAULT_VALUE;
};

const addPrefixAndSuffix = (value: string | number, options: ValueOptions): string => {
  return `${options.prefix || ''} ${value} ${options.suffix || ''}`;
};

export const formatValue = (data?: LocationData[], options: ValueOptions = {}): ReactText => {
  const value = getValue(data, options);

  return value !== DEFAULT_VALUE ? addPrefixAndSuffix(value, options) : value;
};
