import React, { FunctionComponent } from 'react';
import { EChartOption } from 'echarts';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { toBasicAxisData } from '../EChartsBaseChart/utils';

interface ComponentProps {
  years?: (string | number)[];
  series?: [];
  height?: string;
}

const LocationComparisonLineChart: FunctionComponent<ComponentProps> = props => {
  const options: EChartOption = {
    tooltip: {},
    legend: {
      data: props.series?.map(item => {
        const { name } = item;
        return name;
      })
    },
    xAxis: {
      data: toBasicAxisData(props.years ? props.years : [])
    },
    series: props.series?.map(item => {
      const { name, data } = item;
      return {
        name,
        type: 'line',
        data
      };
    })
  };

  return <EChartsBaseChart options={options} height={'500px'} />;
};

export { LocationComparisonLineChart };
