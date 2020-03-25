import React, { FunctionComponent } from 'react';
import { EChartOption } from 'echarts';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { toBasicAxisData } from '../EChartsBaseChart/utils';
import { LocationData } from '../../utils';

interface ComponentProps {
  years: (string | number)[];
  data: FormatedData;
  prefix?: string;
  suffix?: string;
  height?: string;
}

type FormatedData = { [location: string]: { [year: string]: LocationData[] } };

const LocationComparisonLineChart: FunctionComponent<ComponentProps> = props => {
  const options: EChartOption<EChartOption.SeriesLine | EChartOption.SeriesBar> = {
    tooltip: {
      trigger: 'axis'
    },
    legend: { show: true },
    xAxis: {
      data: toBasicAxisData(props.years ? props.years : []),
      interval: props.years.length <= 12 ? 1 : 4,
      boundaryGap: false
    },
    series: Object.keys(props.data).map<EChartOption.SeriesLine | EChartOption.SeriesBar>(location => ({
      name: location,
      data: props.years.map(year => (props.data[location][year] ? props.data[location][year][0].value || 0 : 0)),
      type: props.years.length > 2 ? 'line' : 'bar',
      connectNulls: true,
      smooth: true,
      areaStyle: {},
      lineStyle: { opacity: 0 },
      symbol: 'circle',
      barWidth: 40
    }))
  };

  return <EChartsBaseChart options={options} height={props.height} />;
};

LocationComparisonLineChart.defaultProps = { height: '500px' };

export { LocationComparisonLineChart };
