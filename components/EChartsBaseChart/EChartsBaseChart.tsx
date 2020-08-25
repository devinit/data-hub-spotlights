import merge from 'deepmerge';
import { EChartOption, ECharts, EChartsMediaOption, init } from 'echarts';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { axisDefaults, defaults } from './utils/options';

interface EChartBaseChartProps {
  width?: string;
  height?: string;
  classNames?: string;
  options: EChartOption;
  media?: EChartsMediaOption[];
  notMerge?: boolean; // states whether not to merge with previous option on update
}

const setOptions = (chart: ECharts, options: EChartOption, media?: EChartsMediaOption[], notMerge = false): void => {
  if (options.xAxis && Array.isArray(options.xAxis)) {
    options.xAxis = options.xAxis.map((axis) => merge(axisDefaults, axis));
  }
  if (options.yAxis && Array.isArray(options.yAxis)) {
    options.yAxis = options.yAxis.map((axis) => merge(axisDefaults, axis));
  }
  chart.setOption(
    {
      baseOption: merge(defaults, options, { arrayMerge: (_destinationArray, sourceArray) => sourceArray }),
      media,
    },
    notMerge
  );
};

const EChartsBaseChart: FunctionComponent<EChartBaseChartProps> = (props) => {
  const chartNode = useRef<HTMLDivElement>(null);
  const [baseChart, setBaseChart] = useState<ECharts | undefined>(undefined);
  useEffect(() => {
    if (chartNode && chartNode.current) {
      const chart = init(chartNode.current);
      setOptions(chart, props.options, props.media);
      setBaseChart(chart);
    }
  }, []);
  useEffect(() => {
    if (baseChart) {
      setOptions(baseChart, props.options, props.media, props.notMerge);
    }
  }, [props.options]);
  useEffect(() => {
    if (props.height && baseChart) {
      baseChart.resize({ height: props.height });
    }
  }, [props.height]);

  const onResize = (width: number): void => {
    if (baseChart && chartNode.current) {
      baseChart.resize({ width: `${width}px` });
    }
  };

  return (
    <div ref={chartNode} style={{ width: props.width, height: props.height }} className={props.classNames}>
      {chartNode.current ? <ReactResizeDetector handleWidth handleHeight onResize={onResize} /> : null}
    </div>
  );
};

EChartsBaseChart.defaultProps = {
  width: '100%',
  height: '400px',
  notMerge: false,
};

export { EChartsBaseChart as default, EChartsBaseChart };
