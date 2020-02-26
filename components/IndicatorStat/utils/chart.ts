import { Aggregation, IndicatorChart, LocationData, LocationIndicatorData } from '../../../utils';
import { toBasicAxisData } from '../../EChartsBaseChart/utils';

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

const getLegendOptions = (data: LocationData[], field: string, defaultOptions?: ECharts.Legend): ECharts.Legend => {
  const legendData = extractDataByField(data as any, field);

  return defaultOptions ? { ...defaultOptions, data: legendData } : { show: true, data: legendData };
};

const getXAxisOptions = (data: LocationData[], field: string, defaultOptions?: ECharts.XAxis): ECharts.XAxis => {
  const xAxisData = extractDataByField(data as any, field);

  return defaultOptions
    ? { ...defaultOptions, data: toBasicAxisData(xAxisData) }
    : { data: toBasicAxisData(xAxisData) };
};

const getBasicSeriesOptions = (data: LocationData[], fields: string[], series: ECharts.Series[]): ECharts.Series[] => {
  fields.forEach((field, index) => {
    const yAxisData = extractDataByField(data as any, field);
    if (series[index]) {
      const _series = series[index];
      _series.data = yAxisData;
    } else {
      series = [{ type: 'bar', data: yAxisData }];
    }
  });

  return series;
};

const getAggregatedSeriesOptions = (
  data: LocationData[],
  fields: string[],
  series: ECharts.Series[],
  aggregation: Aggregation
): ECharts.Series[] => {
  if (aggregation === 'PERCENT') {
    data.forEach(_data => {
      const values = fields.reduce((prev: number[], curr) => {
        const value = getFieldValue(_data as any, curr);
        return prev.concat([parseFloat(`${value || 0}`)]);
      }, []);
      const total = values.reduce((prev, curr) => prev + curr, 0);
      values.forEach((value, index) => {
        const percentage = ((value / total) * 100).toFixed(2);
        if (series[index]) {
          const _series = series[index];
          if (_series.data) {
            _series.data.push(percentage);
          } else {
            _series.data = [percentage];
          }
        } else {
          series = [{ type: 'bar', data: [percentage] }];
        }
      });
    });
  }
  return series;
};

export const generateChartOptions = (configs: IndicatorChart, data: LocationIndicatorData[]): ECharts.Options => {
  const { options, bar } = configs;
  if (data.length === 1) {
    if (bar) {
      // create legend data based on config
      if (bar.legend) {
        options.legend = getLegendOptions(data[0].data, bar.legend, options.legend);
      }
      // create series data based on config
      if (bar.xAxis) {
        options.xAxis = getXAxisOptions(data[0].data, bar.xAxis, options.xAxis as ECharts.XAxis);
      }
      if (bar.yAxis) {
        if (!configs.aggregation) {
          options.series = getBasicSeriesOptions(data[0].data, bar.yAxis, options.series ? options.series.slice() : []);
        } else {
          options.series = getAggregatedSeriesOptions(
            data[0].data,
            bar.yAxis,
            options.series ? options.series.slice() : [],
            configs.aggregation
          );
        }
      }
      options.grid = options.grid || { bottom: 10, top: 50, right: 0, left: 40 };

      return options;
    }
    // TODO: handle pie charts
  }

  return configs.options;
};
