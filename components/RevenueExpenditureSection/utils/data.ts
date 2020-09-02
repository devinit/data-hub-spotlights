import {
  BudgetType,
  extraValueFromMeta,
  LocationData,
  RevenueExpenditureConfig,
  SpotlightIndicator,
  SpotlightIndicatorContent,
  toCamelCase,
} from '../../../utils';
import { RevenueExpenditureData } from './types';

const getLevels = (data: LocationData): string[] => {
  const levels: string[] = [];
  ['l1', 'l2', 'l3', 'l4', 'l5', 'l6'].forEach((level) => {
    const value = extraValueFromMeta(data.meta, level) as string;
    if (value && levels.indexOf(value) === -1) {
      levels.push(value);
    }
  });

  return levels;
};

type REConfig = RevenueExpenditureConfig;

export const processRevenueExpenditureData = (data: LocationData[], configs?: REConfig): RevenueExpenditureData[] => {
  const processedData = data
    .filter((_data) => typeof _data.value === 'number')
    .map((_data) => ({
      year: _data.year,
      value: _data.value,
      valueLocalCurrency: extraValueFromMeta(_data.meta, 'valueLocalCurrency') as number,
      budgetType: extraValueFromMeta(_data.meta, 'budgetType') as BudgetType,
      levels: getLevels(_data),
    }));

  return configs && configs.root ? processedData.filter((_data) => _data.levels[0] === configs.root) : processedData;
};

export const fetchRootData = (data?: RevenueExpenditureData[], useLocalCurrency = false): number | null => {
  if (data) {
    const rootData = data.find((d) => d.levels.length === 1);
    if (rootData) {
      return useLocalCurrency ? rootData.valueLocalCurrency : rootData.value;
    } else {
      return data.reduce((prev, curr) => {
        if (useLocalCurrency) {
          return (curr.valueLocalCurrency || 0) + prev;
        }

        return (curr.value || 0) + prev;
      }, 0);
    }
  }

  return null;
};

export const getIndicatorContentOptions = (indicator: SpotlightIndicator): REConfig | undefined => {
  if (indicator.advanced_config) {
    try {
      const contentOptions: SpotlightIndicatorContent = JSON.parse(indicator.advanced_config);

      return contentOptions.revenue || contentOptions.expenditure;
    } catch (error) {
      console.log('Invalid JSON:', error.message);
    }
  }

  return undefined;
};

export const parseBudgetType = (budgetType: string): string =>
  budgetType === 'proj' ? 'Projected' : toCamelCase(budgetType);
