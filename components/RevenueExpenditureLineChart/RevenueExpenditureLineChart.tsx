import { EChartOption, EChartsMediaOption } from 'echarts';
import React, { FunctionComponent } from 'react';
import { BudgetType, formatNumber, ValueOptions, addPrefixAndSuffix } from '../../utils';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { YearData, fetchRootData } from '../RevenueExpenditureSection/utils';

interface ComponentProps {
  data: YearData;
  budgetType?: BudgetType;
  height?: string;
  valueOptions: ValueOptions;
  selectedYear?: number;
}

/**
 * Take data and return in format accepted by the series.data property
 * @param data - Organised by Year
 * @param budgetType - actual | proposed | projected
 * @param useLocalCurrency - whether to use data in local currency or USD
 */
const formatData = (data: YearData, budgetType?: BudgetType, useLocalCurrency = false): [number, number][] => {
  const formattedData: [number, number][] = [];
  Object.keys(data).forEach((year) => {
    const yearData = data[year];
    if (budgetType && yearData.hasOwnProperty(budgetType)) {
      const rootData = fetchRootData(yearData[budgetType], useLocalCurrency);
      if (rootData) {
        formattedData.push([parseInt(year), rootData]);
      }
    } else {
      const _budgetType = Object.keys(yearData)[0] as BudgetType | undefined;
      if (_budgetType) {
        const rootData = fetchRootData(yearData[_budgetType], useLocalCurrency);
        if (rootData) {
          formattedData.push([parseInt(year), rootData]);
        }
      }
    }
  });

  return formattedData;
};

const RevenueExpenditureLineChart: FunctionComponent<ComponentProps> = ({ valueOptions, selectedYear, ...props }) => {
  const data = formatData(props.data, props.budgetType, valueOptions.useLocalValue);

  const options: EChartOption<EChartOption.SeriesLine> = {
    legend: { show: false },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
          backgroundColor: '#E84439',
          formatter: ({ axisDimension, value }: { axisDimension: 'x' | 'y'; value: number }): string =>
            axisDimension === 'x' ? `${value}` : `${formatNumber(value)}`,
        },
      },
      formatter: (params: EChartOption.Tooltip.Format[]): string => {
        const { value } = params[0] as { value: [number, number] };

        return `<div style="font-size:16px;"><strong>${value[0]}</strong> | ${addPrefixAndSuffix(
          formatNumber(value[1], 1),
          valueOptions
        )}</div>`;
      },
    },
    xAxis: {
      type: 'value',
      min: data.length && data[0].length ? data[0][0] : undefined,
      axisLabel: { formatter: (value: number): number => value },
      interval: data && data.length <= 12 ? 1 : 4,
    },
    yAxis: {
      splitLine: { show: false },
      axisLabel: {
        formatter: (value: number): string => {
          return formatNumber(value, 0);
        },
      },
    },
    series: [
      {
        type: 'line',
        data,
        showSymbol: false,
        connectNulls: true,
        smooth: true,
        symbol: 'circle',
        markArea:
          typeof selectedYear !== 'undefined'
            ? {
                label: {
                  show: true,
                  backgroundColor: '#E84439',
                  padding: 8,
                  color: '#fff',
                },
                data: [[{ name: `${selectedYear}`, xAxis: selectedYear - 0.5 }, { xAxis: selectedYear + 0.5 }]] as any, // eslint-disable-line @typescript-eslint/no-explicit-any
              }
            : undefined,
      },
    ],
  };
  // Options for medium & large sized devices
  const mdOptions: EChartsMediaOption = {
    query: { minWidth: 450 },
    option: {
      grid: { left: '10%' },
    },
  };
  // Options for small screen devices
  const xsOptions: EChartsMediaOption = {
    query: { maxWidth: 350 },
    option: {
      grid: { left: '15%' },
    },
  };

  const media: EChartsMediaOption[] = [mdOptions, xsOptions];

  return <EChartsBaseChart options={options} height={props.height} media={media} />;
};

RevenueExpenditureLineChart.defaultProps = { height: '500px' };

export { RevenueExpenditureLineChart };
