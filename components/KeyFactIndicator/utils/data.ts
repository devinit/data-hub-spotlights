import { BudgetType, LocationData, LocationDataMeta } from '../../../utils';

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

const getValue = (data: LocationData, options: ValueOptions): string => {
  if (options.useLocalValue) {
    return getLocalValue(data, options);
  }
  return addPrefixAndSuffix(formatNumber(data.value), options);
};

/**
 * As the name suggests
 * @param data - assumptions is that the data is of the same year, thus there should be only one of each budget type
 * @param budgetType - The budget type to find
 */
const filterDataByBudgetType = (data: LocationData[], budgetType: BudgetType): LocationData | undefined => {
  return data.find(_data => {
    if (_data.meta) {
      try {
        const meta: LocationDataMeta = JSON.parse(_data.meta);
        return meta.budgetType && meta.budgetType === budgetType;
      } catch (error) {
        console.log(error);

        return false;
      }
    }

    return false;
  });
};

const processMultipleData = (data: LocationData[], options: ValueOptions = { dataFormat: 'plain' }): string => {
  const sortedData = data.sort((a, b) => a.year - b.year);
  const latest = sortedData.filter(d => d.year === sortedData[data.length - 1].year);
  if (latest && latest.length > 1) {
    const actual = filterDataByBudgetType(data, 'actual');
    if (actual) {
      return getValue(actual, options);
    } else {
      const approved = filterDataByBudgetType(data, 'approved');
      if (approved) {
        return getValue(approved, options);
      } else {
        const proposed = filterDataByBudgetType(data, 'proposed');
        if (proposed) {
          return getValue(proposed, options);
        }
      }
    }
  }
  if (sortedData[data.length - 1].value) {
    return getValue(sortedData[data.length - 1], options);
  }

  return DEFAULT_VALUE;
};

export const formatValue = (data?: LocationData[], options: ValueOptions = { dataFormat: 'plain' }): string => {
  if (data && data.length) {
    if (data.length === 1 && data[0].value) {
      return getValue(data[0], options);
    }
    // if no aggregation is specified, use the value of the most recent year
    if (!options.aggregation) {
      return processMultipleData(data, options);
    }
  }

  return DEFAULT_VALUE;
};
