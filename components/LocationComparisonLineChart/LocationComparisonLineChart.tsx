import React, { FunctionComponent } from 'react';
import { EChartsBaseChart } from '../EChartsBaseChart';
import { toBasicAxisData } from '../EChartsBaseChart/utils';

interface ComponentProps {
  labels?: string[];
  series?: {
    names: [string, string];
    data: [number[], number[]];
  };
  height?: string;
}

const LocationComparisonLineChart: FunctionComponent<ComponentProps> = props => {
  const options: ECharts.Options = {
    title: {
      text: ''
    },
    tooltip: {},
    legend: {
      data: []
    },
    xAxis: {
      data: toBasicAxisData([])
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
        type: 'line',
        data: []
      },
      {
        name: 'Expenses',
        type: 'line',
        data: []
      }
    ]
  };

  return <EChartsBaseChart options={options} height={props.height} />;
};

export { LocationComparisonLineChart };
