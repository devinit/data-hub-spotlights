import { groupBy } from 'underscore';
import { SpotlightIndicator } from '../../../utils';
import { DataLoaderProps, useDDWData } from '../../DDWDataLoader';
import { getIndicatorContentOptions, processRevenueExpenditureData } from './data';
import { BudgetTypeData, RevenueExpenditureHook as REHook } from './types';
import { useState, useEffect } from 'react';

export const useRevenueExpenditureData = (optns: DataLoaderProps, indicator: SpotlightIndicator): REHook => {
  const [retryCount, setRetryCount] = useState(0);
  const { data, dataLoading, options, setOptions, refetch, error } = useDDWData(optns);
  useEffect(() => {
    if (error) {
      const { message } = error;
      if (message.includes('relation') && message.includes('does not exist') && retryCount === 0 && refetch) {
        refetch();
        setRetryCount(retryCount + 1);
      }
    } else if (retryCount > 0) {
      setRetryCount(0);
    }
  }, [error]);

  if (!dataLoading && data && data.length) {
    const configs = getIndicatorContentOptions(indicator);
    const processedData = processRevenueExpenditureData(data[0].data, configs);
    const groupedByYear = groupBy(processedData, (processedData) => processedData.year);
    const groupedByYearAndBudgetType: { [key: string]: BudgetTypeData } = {};
    Object.keys(groupedByYear).forEach((year) => {
      const groupedByBudgetType = groupBy(groupedByYear[year], (processedData) => processedData.budgetType);
      groupedByYearAndBudgetType[year] = groupedByBudgetType;
    });

    return {
      data: groupedByYearAndBudgetType,
      dataLoading: false,
      options,
      refetch,
      setOptions,
    };
  }

  return { data: {}, dataLoading: retryCount > 0 || dataLoading, options, setOptions, refetch, error };
};
