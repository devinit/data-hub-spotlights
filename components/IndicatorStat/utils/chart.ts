import { EChartOption } from 'echarts';
import { Aggregation, IndicatorChart, LocationData, LocationIndicatorData, BarLineOptions } from '../../../utils';
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

const extractDataByField = (data: LocationDataIndex[], field: string, allowDuplicates = false): string[] =>
  data.reduce((prev: string[], curr) => {
    const value = getFieldValue(curr, field);

    return allowDuplicates || (value && prev.indexOf(`${value}`) === -1) ? prev.concat([`${value}`]) : prev;
  }, []);

const getLegendOptions = (
  data: LocationData[],
  field: string,
  defaultOptions?: EChartOption.Legend
): EChartOption.Legend => {
  const legendData = extractDataByField(data as any, field);

  return defaultOptions ? { ...defaultOptions, data: legendData } : { show: true, data: legendData };
};

const getXAxisOptions = (
  data: LocationData[],
  field: string,
  defaultOptions?: EChartOption.XAxis
): EChartOption.XAxis => {
  const xAxisData = extractDataByField(data as any, field);

  return defaultOptions
    ? { ...defaultOptions, data: toBasicAxisData(xAxisData) }
    : { data: toBasicAxisData(xAxisData) };
};

const getBasicSeriesOptions = (
  data: LocationData[],
  fields: string[],
  series: (EChartOption.SeriesLine | EChartOption.SeriesBar)[]
): (EChartOption.SeriesLine | EChartOption.SeriesBar)[] => {
  fields.forEach((field, index) => {
    const yAxisData = extractDataByField(data as any, field, true); // eslint-disable-line @typescript-eslint/no-explicit-any
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
  series: (EChartOption.SeriesLine | EChartOption.SeriesBar)[],
  aggregation: Aggregation
): (EChartOption.SeriesLine | EChartOption.SeriesBar)[] => {
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
            _series.data.push(percentage as any);
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

const createBarLineOptions = (
  data: LocationData[],
  custom: BarLineOptions,
  options: EChartOption<EChartOption.SeriesBar | EChartOption.SeriesLine>,
  aggregation?: Aggregation
): EChartOption<EChartOption.SeriesBar | EChartOption.SeriesLine> => {
  const optns = { ...options };
  // create legend data based on config
  if (custom.legend) {
    optns.legend = getLegendOptions(data, custom.legend, options.legend);
  }
  // create series data based on config
  if (custom.xAxis) {
    optns.xAxis = getXAxisOptions(data, custom.xAxis, options.xAxis as EChartOption.XAxis);
  }
  if (custom.yAxis) {
    if (!aggregation) {
      optns.series = getBasicSeriesOptions(data, custom.yAxis, options.series ? options.series.slice() : []);
    } else {
      optns.series = getAggregatedSeriesOptions(
        data,
        custom.yAxis,
        options.series ? options.series.slice() : [],
        aggregation
      );
    }
  }

  return optns;
};

export const generateChartOptions = (configs: IndicatorChart, data: LocationIndicatorData[]): EChartOption => {
  const { options, bar, line } = configs;
  if (data.length === 1) {
    if (bar) {
      options.grid = options.grid || { bottom: 20, top: 40, right: 0, left: 40 };

      return { ...options, ...createBarLineOptions(data[0].data, bar, options, configs.aggregation) };
    }
    if (line) {
      options.grid = options.grid || { bottom: 20, top: 40, right: 20, left: 40 };

      return { ...options, ...createBarLineOptions(data[0].data, line, options, configs.aggregation) };
    }
    // TODO: handle pie charts
  }

  return configs.options;
};
