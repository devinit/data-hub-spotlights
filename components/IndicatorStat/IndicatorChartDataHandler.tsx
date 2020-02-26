import React, { FunctionComponent } from 'react';
import { LocationIndicatorData, IndicatorChart } from '../../utils';
import { IndicatorStatChart } from './IndicatorStatChart';
import { toBasicAxisData } from '../EChartsBaseChart/utils';

interface DataHandlerProps extends IndicatorChart {
  data?: LocationIndicatorData[];
  dataLoading?: boolean;
}

type LocationDataIndex = { [key: string]: string | number };

const getFieldValue = (data: LocationDataIndex, field: string): string | number | null => {
  let value: string | number | undefined = data[field];
  if (!value) {
    try {
      const meta = JSON.parse(data['meta'] as string);
      value = meta.extra ? meta.extra[field] || null : null;
    } catch (error) {
      return null;
    }
  }

  return value || null;
};

const extractDataByField = (data: LocationDataIndex[], field: string): string[] => {
  return data.reduce((prev: string[], curr) => {
    const value = getFieldValue(curr, field);
    if (value && prev.indexOf(`${value}`) === -1) {
      return prev.concat([`${value}`]);
    }

    return prev;
  }, []);
};

const IndicatorChartDataHandler: FunctionComponent<DataHandlerProps> = ({ data, dataLoading, ...configs }) => {
  if (!dataLoading && data) {
    const { options, bar } = configs;
    if (data.length === 1) {
      if (bar) {
        // create legend data based on config
        if (bar.legend) {
          const legendData = extractDataByField(data[0].data as any, bar.legend);
          if (options.legend) {
            options.legend.data = legendData;
          } else {
            options.legend = { show: true, data: legendData };
          }
        }

        // create series data based on config
        if (bar.xAxis) {
          const xAxisData = extractDataByField(data[0].data as any, bar.xAxis);
          if (options.xAxis) {
            (options.xAxis as ECharts.XAxis).data = toBasicAxisData(xAxisData);
          } else {
            options.xAxis = { data: toBasicAxisData(xAxisData) };
          }
        }
        if (bar.yAxis) {
          if (!configs.aggregation) {
            bar.yAxis.forEach((field, index) => {
              const yAxisData = extractDataByField(data[0].data as any, field);
              if (options.series && options.series[index]) {
                const series = options.series[index];
                series.data = yAxisData;
              } else {
                options.series = [{ type: 'bar', data: yAxisData }];
              }
            });
          } else {
            if (configs.aggregation === 'PERCENT') {
              data[0].data.forEach(_data => {
                const values = bar.yAxis.reduce((prev: number[], curr) => {
                  const value = getFieldValue(_data as any, curr);
                  return prev.concat([parseFloat(`${value || 0}`)]);
                }, []);
                const total = values.reduce((prev, curr) => prev + curr, 0);
                values.forEach((value, index) => {
                  const percentage = ((value / total) * 100).toFixed(2);
                  if (options.series && options.series[index]) {
                    const series = options.series[index];
                    if (series.data) {
                      series.data.push(percentage);
                    } else {
                      series.data = [percentage];
                    }
                  } else {
                    options.series = [{ type: 'bar', data: [percentage] }];
                  }
                });
              });
            }
          }
        }
        options.grid = { bottom: 10, top: 50, right: 0, left: 40 };
        options.tooltip = {
          trigger: 'item',
          formatter: '{a} - {c}%'
        };

        return <IndicatorStatChart options={options} />;
      }
    }
    // TODO: handle charts build from multiple indicators

    return <div>No Data</div>;
  }

  return <div>Loading ...</div>;
};

export { IndicatorChartDataHandler };
