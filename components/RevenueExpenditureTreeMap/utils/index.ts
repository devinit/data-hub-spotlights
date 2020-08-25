import { RevenueExpenditureData } from '../../RevenueExpenditureSection/utils';
import { EChartOption } from 'echarts';
import { toCamelCase, RevenueExpenditureConfig } from '../../../utils';

export type TreemapDataObject = EChartOption.SeriesTreemap.DataObject;

/**
 * Checks whether the data levels are index based or by aggregation
 * @param data - RevenueExpenditureData Array
 */
export const isIndexBased = (data: RevenueExpenditureData[]): boolean => !!data.find((d) => d.levels.length === 1);

export const getRootLevelByLength = (
  data: RevenueExpenditureData[],
  useLocalCurrency = false
): [string, number] | null => {
  const rootData = data.find((d) => d.levels.length === 1);

  return rootData ? [rootData.levels[0], useLocalCurrency ? rootData.valueLocalCurrency : rootData.value] : null;
};

export const getRootLevelFromSeriesData = (seriesData: TreemapDataObject[]): [string, number] | null =>
  seriesData.length === 1 ? [seriesData[0].name as string, seriesData[0].value as number] : null;

export const getRootLevel = (
  data: RevenueExpenditureData[],
  seriesData: TreemapDataObject[],
  useLocalCurrency = false
): [string, number] | null => {
  return getRootLevelByLength(data, useLocalCurrency) || getRootLevelFromSeriesData(seriesData);
};

/**
 * Works on (as it appears in the DDW) country-level data - All levels are represented here and do not require aggregation
 * to acquire parent values. i.e. root level will have a length of 1, next will have 2, and so forth
 * @param data - RevenueExpenditureData Array
 * @param level - Name/ID of the current level
 * @param index - Index of the current level - default is 0 for the root level
 * @param useLocalCurrency - Which value to use i.e. USD or local currency
 */
export const createDataTreeByIndex = (
  data: RevenueExpenditureData[],
  level: string,
  index = 0,
  useLocalCurrency = false
): TreemapDataObject[] => {
  return data
    .filter((item) => item.levels[index] === level && item.levels.length === index + 2)
    .map((item) => ({
      name: toCamelCase(item.levels[item.levels.length - 1].split('-').join(' ')),
      value: useLocalCurrency ? item.valueLocalCurrency : item.value,
      children: createDataTreeByIndex(data, item.levels[item.levels.length - 1], index + 1, useLocalCurrency),
    }));
};

export const createDataTreeByAggregation = (
  data: RevenueExpenditureData[],
  rootLevel: string,
  useLocalCurrency = false
): TreemapDataObject[] => {
  /**
   * 1. Get current root level
   * 2. Get index of the current root level from any of the levels e.g. data[0].levels
   * 3. Get all data that has the root level in their tree, at that index, with that parent
   * 4. For each of the above, build their trees by going through steps 1-3, with each as the root level
   * 5. For each completed tree, aggregate their values to get the value of the root level
   */
  if (data && data.length) {
    const index = data[0].levels.indexOf(rootLevel);
    if (index !== data[0].levels.length - 1) {
      const childrenNames = data
        .filter((child) => child.levels.indexOf(rootLevel) === index)
        .reduce((prev: string[], curr) => {
          const childLevel = curr.levels[index + 1];

          return prev.includes(childLevel) ? prev : prev.concat(childLevel);
        }, []);

      return childrenNames.map((child) => {
        const childData = data.filter((_data) => _data.levels[index + 1] === child);

        return {
          name: child,
          value: childData.reduce((prev, curr) => prev + (useLocalCurrency ? curr.valueLocalCurrency : curr.value), 0),
          children: createDataTreeByAggregation(childData, child, useLocalCurrency),
        };
      });
    }
  }

  return [];
};

export const getSeriesData = (
  data?: RevenueExpenditureData[],
  config?: RevenueExpenditureConfig,
  useLocalCurrency = false
): TreemapDataObject[] => {
  if (data) {
    const rootLevel = getRootLevelByLength(data, useLocalCurrency);
    if (rootLevel) {
      return createDataTreeByIndex(data, rootLevel[0], 0, useLocalCurrency);
    }
    if (config) {
      const children = createDataTreeByAggregation(data, config.root, useLocalCurrency);

      return [
        {
          name: config.root,
          value: children.reduce((prev, curr) => prev + (curr.value as number), 0),
          children,
        },
      ];
    } else {
      console.log('Configure root in CMS');
    }
  }

  return [];
};
