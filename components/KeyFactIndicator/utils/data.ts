import { LocationData, LocationDataMeta } from '../../../utils';

export interface ValueOptions {
  useLocalValue?: boolean;
  dataFormat: 'plain' | 'currency' | 'percent';
  aggregation?: string;
  prefix?: string;
  suffix?: string;
}

const DEFAULT_VALUE = 'No Data';

const addPrefixAndSuffix = (value: string | number, options: ValueOptions): string => {
  return `${options.prefix || ''} ${value} ${options.suffix || ''}`;
};

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

const getLocalValue = (data: LocationData, options: ValueOptions): string => {
  if (data.meta) {
    const meta: LocationDataMeta = JSON.parse(data.meta);
    if (meta.valueLocalCurrency) {
      return addPrefixAndSuffix(formatNumber(meta.valueLocalCurrency), options);
    }
  }

  return addPrefixAndSuffix(data.value.toFixed(2), {
    ...options,
    prefix: options.dataFormat === 'currency' ? 'US$' : options.prefix
  });
};

export const formatValue = (data?: LocationData[], options: ValueOptions = { dataFormat: 'plain' }): string => {
  if (data && data.length) {
    if (data.length === 1 && data[0].value) {
      if (options.useLocalValue) {
        return getLocalValue(data[0], options);
      }
      return addPrefixAndSuffix(formatNumber(data[0].value), options);
    }
    // if no aggregation is specified, use the value of the most recent year
    if (!options.aggregation) {
      const sortedData = data.sort((a, b) => a.year - b.year);
      if (sortedData[data.length - 1].value) {
        return addPrefixAndSuffix(formatNumber(sortedData[data.length - 1].value), options);
      }
    }
  }

  return DEFAULT_VALUE;
};
