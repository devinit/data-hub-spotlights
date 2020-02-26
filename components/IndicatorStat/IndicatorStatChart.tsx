import React, { FunctionComponent } from 'react';
import { EChartsBaseChart } from '../EChartsBaseChart';

interface IndicatorStatChartProps {
  options: ECharts.Options;
}

const IndicatorStatChart: FunctionComponent<IndicatorStatChartProps> = ({ options }) => {
  return (
    <div>
      <EChartsBaseChart options={options} width="240px" height="230px" />
      <style jsx>{`
        position: relative;
        min-height: 250px;
        border: 1px solid #e84439;
        width: 100%;
        padding: 20px;
      `}</style>
    </div>
  );
};

export { IndicatorStatChart };
