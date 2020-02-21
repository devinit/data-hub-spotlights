import { LocationData, LocationDataMeta } from '../../../utils';
import { ReactText } from 'react';

export interface ValueOptions {
  useLocalValue?: boolean;
  aggregation?: string;
  prefix?: string;
  suffix?: string;
}

const DEFAULT_VALUE = 'No Data';

const formatNumber = (value: number): string => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}b`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}m`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}k`;
  }
  return `${value.toFixed(2)}`;
};

const getLocalValue = (data: LocationData): string | number => {
  if (data.meta) {
    const meta: LocationDataMeta = JSON.parse(data.meta);
    if (meta.valueLocalCurrency) {
      return formatNumber(meta.valueLocalCurrency);
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
      return formatNumber(data[0].value);
    }
    // if no aggregation is specified, use the value of the most recent year
    if (!options.aggregation) {
      const sortedData = data.sort((a, b) => a.year - b.year);
      if (sortedData[data.length - 1].value) {
        return formatNumber(sortedData[data.length - 1].value);
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
