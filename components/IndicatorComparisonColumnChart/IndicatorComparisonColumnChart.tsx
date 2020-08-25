import React, { FunctionComponent } from 'react';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { toBasicAxisData } from '../EChartsBaseChart/utils';
import { EChartOption, EChartsMediaOption } from 'echarts';
import { formatNumber, addPrefixAndSuffix, ValueOptions } from '../../utils';
import { formatSeries } from '../ComparisonChartDataHandler/utils';

interface ComponentProps {
  series?: {
    names: [string, string];
    data: [number[], number[]];
  };
  height?: string;
  valueOptions: ValueOptions[];
}

const IndicatorComparisonColumnChart: FunctionComponent<ComponentProps> = ({ valueOptions, ...props }) => {
  if (!props.series) {
    return <div>No Data</div>;
  }

  const options: EChartOption<EChartOption.SeriesBar> = {
    tooltip: {
      formatter: (params: EChartOption.Tooltip.Format): string => {
        const { seriesName, seriesIndex, value } = params;

        return seriesIndex === 1
          ? formatSeries('', seriesName, value as number, valueOptions[1])
          : formatSeries('', seriesName, value as number, valueOptions[0]);
      },
    },
    legend: { show: false },
    xAxis: {
      data: toBasicAxisData(['Indicators']),
      axisLabel: { show: false },
    },
    yAxis: [
      {
        name: props.series.names[0],
        nameLocation: 'center',
        nameTextStyle: { padding: 30, color: '#32313f' },
        type: 'value',
        position: 'left',
        axisLabel: {
          formatter: (value: number): string => addPrefixAndSuffix(formatNumber(value, 0), valueOptions[0]),
        },
      },
      {
        name: props.series.names[1],
        type: 'value',
        position: 'right',
        nameLocation: 'center',
        nameTextStyle: { padding: 30, color: '#32313f' },
        axisLabel: {
          formatter: (value: number): string => addPrefixAndSuffix(formatNumber(value, 0), valueOptions[1]),
        },
      },
    ],
    color: ['#0089cc', '#eb642b'], // TODO: perhaps configure these in CMS
    series: [
      {
        name: props.series.names[0],
        type: 'bar',
        barWidth: 50,
        barGap: '100%',
        data: toBasicAxisData(props.series.data[0]),
      },
      {
        name: props.series.names[1],
        type: 'bar',
        barWidth: 50,
        barGap: '100%',
        yAxisIndex: 1,
        data: toBasicAxisData(props.series.data[1]),
      },
    ] as EChartOption.SeriesBar[],
    grid: [{ left: '20%', right: '20%' }],
  };

  const lgOptions: EChartsMediaOption = {
    query: { minWidth: 550 },
    option: {
      legend: { show: false },
      yAxis: [
        { name: props.series.names[0], nameTextStyle: { padding: 30 } },
        { name: props.series.names[1], nameTextStyle: { padding: 30 } },
      ],
      series: [{ barWidth: 50 }, { barWidth: 50 }],
    },
  };
  // Options for medium sized devices
  const mdOptions: EChartsMediaOption = {
    query: { maxWidth: 500 },
    option: {
      legend: { show: false },
      yAxis: lgOptions.option.yAxis,
      series: [{ barWidth: 50 }, { barWidth: 50 }],
    },
  };
  const smOptions: EChartsMediaOption = {
    query: { maxWidth: 300 },
    option: {
      grid: { top: '12%' },
      legend: { show: true },
      yAxis: [
        { name: '', nameTextStyle: { padding: 0 } },
        { name: '', nameTextStyle: { padding: 0 } },
      ],
      series: [{ barWidth: 20 }, { barWidth: 20 }],
    },
  };

  const media: EChartsMediaOption[] = [lgOptions, mdOptions, smOptions];

  return <EChartsBaseChart options={options} height={props.height} media={media} />;
};

export { IndicatorComparisonColumnChart };
