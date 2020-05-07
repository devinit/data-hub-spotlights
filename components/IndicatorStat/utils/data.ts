import {
  BudgetType,
  formatNumber,
  LocationData,
  LocationDataMeta,
  LocationIndicatorData,
  ProcessedData
} from '../../../utils';
import { addPrefixAndSuffix, DEFAULT_VALUE, ValueOptions } from '../../../utils';

const getLocalValue = (data: LocationData, options: ValueOptions): string => {
  if (data.meta) {
    const meta: LocationDataMeta = JSON.parse(data.meta);
    if (meta.valueLocalCurrency) {
      return addPrefixAndSuffix(formatNumber(meta.valueLocalCurrency, options.decimalCount), options);
    }
  }

  return addPrefixAndSuffix(formatNumber(data.value, options.decimalCount), {
    ...options,
    prefix: options.dataFormat === 'currency' ? 'US$' : options.prefix
  });
};

const getValue = (data: LocationData, options: ValueOptions): string => {
  if (options.useLocalValue) {
    return getLocalValue(data, options);
  }

  return addPrefixAndSuffix(formatNumber(data.value, options.decimalCount), options);
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

const getOneFromMultipleBudgetTypes = (data: LocationData[]): LocationData | undefined => {
  return (
    filterDataByBudgetType(data, 'actual') ||
    filterDataByBudgetType(data, 'approved') ||
    filterDataByBudgetType(data, 'proposed')
  );
};

const locationDataToProcessedData = ({ name, value, geocode, meta }: LocationData): ProcessedData => ({
  name,
  geocode,
  value: value || 0,
  meta: meta ? JSON.parse(meta) : {}
});

const getSum = (data: ProcessedData[], options: ValueOptions): number => {
  return data.reduce((prev, curr) => {
    if (options.useLocalValue && options.dataFormat === 'currency' && curr.meta) {
      return (curr.meta.valueLocalCurrency || 0) + prev;
    }

    return curr.value + prev;
  }, 0);
};

const aggregateProcessedData = (data: ProcessedData[], options: ValueOptions): number | ProcessedData[] => {
  if (options.aggregation) {
    if (options.aggregation === 'SUM') {
      return getSum(data, options);
    }
    if (options.aggregation === 'AVG') {
      const sum = getSum(data, options);

      return sum / data.length;
    }
    if ((options.aggregation === 'POSN ASC' || options.aggregation === 'POSN DESC') && options.location) {
      const value = data.find(d =>
        d.geocode && options.location?.geocode ? options.location?.geocode.includes(d.geocode) : false
      );
      if (value) {
        const orderedData = data
          .map(d => d.value)
          .sort((a, b) => a - b)
          .reduce<number[]>((prev, curr) => (prev.indexOf(curr) > -1 ? prev : prev.concat(curr)), []);
        const position =
          options.aggregation === 'POSN ASC'
            ? orderedData.findIndex(d => d === value.value)
            : orderedData.reverse().findIndex(d => d === value.value);

        return position > -1 ? position : data;
      }
    }
  }

  return data;
};

const processMultipleData = (data: LocationData[], options: ValueOptions = { dataFormat: 'plain' }): string => {
  const sortedData = data.slice().sort((a, b) => a.year - b.year);
  const latest = sortedData.filter(d => d.year === sortedData[data.length - 1].year);
  if (latest && latest.length > 1) {
    const _data = getOneFromMultipleBudgetTypes(data);
    if (_data) {
      return getValue(_data, options);
    }
  }

  if (!options.aggregation) {
    if (sortedData[data.length - 1].value) {
      return getValue(sortedData[data.length - 1], options);
    }
  } else {
    const aggregate = aggregateProcessedData(data.map(locationDataToProcessedData), options);
    if (typeof aggregate === 'number') {
      return addPrefixAndSuffix(formatNumber(aggregate, options.decimalCount), options);
    }
  }

  return DEFAULT_VALUE;
};

export const getIndicatorValue = (data?: LocationData[], options: ValueOptions = { dataFormat: 'plain' }): string => {
  if (data && data.length) {
    if (data.length === 1 && data[0].value) {
      return getValue(data[0], options);
    }

    return processMultipleData(data, options);
  }

  return DEFAULT_VALUE;
};

export const getIndicatorsValue = (
  data: LocationIndicatorData[],
  options: ValueOptions = { dataFormat: 'plain' }
): string => {
  if (options.aggregation) {
    const values: ProcessedData[] = data.map(_data => {
      if (_data.data.length > 1) {
        const requiredData = getOneFromMultipleBudgetTypes(_data.data);
        if (requiredData) {
          return locationDataToProcessedData(requiredData);
        } else {
          const sortedData = _data.data.sort((a, b) => a.year - b.year);
          const requiredData = sortedData[data.length - 1];

          return locationDataToProcessedData(requiredData);
        }
      }
      const requiredData = _data.data[0];

      return requiredData ? locationDataToProcessedData(requiredData) : { name: '', geocode: '', value: 0, meta: {} };
    });
    const aggregate = aggregateProcessedData(values, options);
    if (typeof aggregate === 'number') {
      return addPrefixAndSuffix(formatNumber(aggregate, options.decimalCount), options);
    }

    return DEFAULT_VALUE; // TODO: remove when properly handled
  }

  console.log('An aggregation property is required to handle data from multiple indicators');

  return 'Invalid Configuration';
};

export const setDecimalCount = (flag: string | undefined, defaultCount: number | undefined): number | undefined => {
  return flag && flag.indexOf('th') === 0 ? 0 : defaultCount;
};
