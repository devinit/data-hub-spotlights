import React, { FunctionComponent } from 'react';
import { EChartOption } from 'echarts';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { toBasicAxisData } from '../EChartsBaseChart/utils';
import { LocationData, formatNumber, addPrefixAndSuffix, ValueOptions } from '../../utils';

interface ComponentProps {
  years: (string | number)[];
  data: FormatedData;
  height?: string;
  valueOptions: ValueOptions;
}

type FormatedData = { [location: string]: { [year: string]: LocationData[] } };

const LocationComparisonLineChart: FunctionComponent<ComponentProps> = props => {
  const options: EChartOption<EChartOption.SeriesLine | EChartOption.SeriesBar> = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: EChartOption.Tooltip.Format[]): string => {
        const name = params[0].name;

        return `<div style="text-align:center;font-size:1.6rem;">${name}</div>${params
          .map(
            param =>
              `<div>${param.marker}${param.seriesName}: ${addPrefixAndSuffix(
                formatNumber(param.value as number, 0),
                props.valueOptions
              )}</div>`
          )
          .join('')}`;
      }
    },
    legend: { show: true },
    xAxis: {
      data: toBasicAxisData(props.years ? props.years : []),
      interval: props.years.length <= 12 ? 1 : 4,
      boundaryGap: false
    },
    yAxis: {
      axisLabel: {
        formatter: (value: number): string => addPrefixAndSuffix(formatNumber(value, 0), props.valueOptions)
      }
    },
    series: Object.keys(props.data).map<EChartOption.SeriesLine | EChartOption.SeriesBar>(location => ({
      name: location,
      data: props.years.map(year => (props.data[location][year] ? props.data[location][year][0].value || 0 : 0)),
      type: props.years.length > 2 ? 'line' : 'bar',
      connectNulls: true,
      smooth: true,
      symbol: 'circle',
      barWidth: 40
    }))
  };

  return <EChartsBaseChart options={options} height={props.height} />;
};

LocationComparisonLineChart.defaultProps = { height: '500px' };

export { LocationComparisonLineChart };
