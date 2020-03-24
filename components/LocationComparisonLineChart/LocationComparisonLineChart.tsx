import React, { FunctionComponent } from 'react';
import { EChartOption } from 'echarts';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { toBasicAxisData } from '../EChartsBaseChart/utils';
import { LocationData } from '../../utils';

interface ComponentProps {
  years: (string | number)[];
  data: FormatedData;
  height?: string;
}

type FormatedData = { [location: string]: { [year: string]: LocationData[] } };

const LocationComparisonLineChart: FunctionComponent<ComponentProps> = props => {
  const options: EChartOption<EChartOption.SeriesLine | EChartOption.SeriesBar> = {
    tooltip: {},
    legend: { show: true },
    xAxis: {
      data: toBasicAxisData(props.years ? props.years : []),
      interval: props.years.length <= 12 ? 1 : 4
    },
    series: Object.keys(props.data).map<EChartOption.SeriesLine | EChartOption.SeriesBar>(location => ({
      name: location,
      data: Object.keys(props.data[location]).map(year => props.data[location][year][0].value),
      type: props.years.length > 2 ? 'line' : 'bar',
      connectNulls: true,
      barWidth: 40
    }))
  };

  return <EChartsBaseChart options={options} height={props.height} />;
};

LocationComparisonLineChart.defaultProps = { height: '500px' };

export { LocationComparisonLineChart };
