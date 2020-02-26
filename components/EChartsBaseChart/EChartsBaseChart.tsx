import merge from 'deepmerge';
import { init } from 'echarts';
import React, { useEffect, useRef, FunctionComponent } from 'react';
import { axisDefaults, defaults } from './utils/options';

interface EChartBaseChartProps {
  width?: string;
  height?: string;
  classNames?: string;
  options: ECharts.Options;
}

const EChartsBaseChart: FunctionComponent<EChartBaseChartProps> = props => {
  const chartNode = useRef(null);
  useEffect(() => {
    if (chartNode) {
      const baseChart = init(chartNode.current);
      const { options } = props;
      if (options.xAxis && Array.isArray(options.xAxis)) {
        options.xAxis = options.xAxis.map(axis => merge(axisDefaults, axis));
      }
      if (options.yAxis && Array.isArray(options.yAxis)) {
        options.yAxis = options.yAxis.map(axis => merge(axisDefaults, axis));
      }
      baseChart.setOption(merge(defaults, props.options));
    }
  }, []);

  return <div ref={chartNode} style={{ width: props.width, height: props.height }} className={props.classNames} />;
};

EChartsBaseChart.defaultProps = {
  width: '100%',
  height: '400px'
};

export { EChartsBaseChart as default, EChartsBaseChart };
