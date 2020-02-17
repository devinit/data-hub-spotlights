import React, { SFC, useEffect, useRef } from 'react';
import { NumericAxisConfig } from './NumericAxisConfig';
import 'plottable/plottable.css';
import './styles.css';

interface PlottableAxisProps {
  width?: string;
  height?: string;
  config: NumericAxisConfig;
}

const PlottableAxis: SFC<PlottableAxisProps> = props => {
  const chartNode = useRef<any | null>(null);
  const createAxis = () => {
    const axis = props.config.getAxis();
    if (chartNode.current) {
      axis.renderTo(chartNode.current as any);
    }
  };
  useEffect(() => {
    createAxis();
  }, []);

  return <div ref={chartNode} style={{ width: props.width, height: props.height }} />;
};

PlottableAxis.defaultProps = {
  width: '600px'
};

export { PlottableAxis as default, PlottableAxis, NumericAxisConfig };
