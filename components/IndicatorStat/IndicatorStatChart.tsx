import React, { FunctionComponent } from 'react';
import { IndicatorChart } from '../../utils';
import { EChartsBaseChart } from '../EChartsBaseChart';

type IndicatorStatChartProps = IndicatorChart;

const IndicatorStatChart: FunctionComponent<IndicatorStatChartProps> = ({ options }) => {
  return (
    <div className="spotlight__interactive">
      <EChartsBaseChart options={options} />
    </div>
  );
};

export { IndicatorStatChart };
