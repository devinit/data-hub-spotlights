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

const LocationComparisonLineChart: FunctionComponent<ComponentProps> = () => {
  const options: ECharts.Options = {
    title: {
      text: 'Basic Bar Chart'
    },
    tooltip: {},
    legend: {
      data: ['Sales', 'Expenses']
    },
    xAxis: {
      data: toBasicAxisData(['Shirt', 'Cardign', 'Chiffon Shirt', 'Pants', 'Heels', 'Socks'])
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
        type: 'line',
        data: [5, 20, 36, 15, 10, 25]
      },
      {
        name: 'Expenses',
        type: 'line',
        data: [2, 30, 3, 40, 20, 36]
      }
    ]
  };

  return <EChartsBaseChart options={options} height={'500px'} />;
};

export { LocationComparisonLineChart };
