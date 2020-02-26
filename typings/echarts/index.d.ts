declare module 'echarts';

declare namespace ECharts {
  interface Options {
    title?: {
      text: string;
    };
    tooltip?: {
      trigger?: 'item' | 'axis' | 'none';
      formatter?: string;
    };
    legend?: {
      show?: boolean;
      data?: string[];
    };
    xAxis?: XAxis | XAxis[];
    yAxis?: YAxis | YAxis[];
    series?: Series[];
    color?: string[];
    grid?: Grid | Grid[];
    textStyle?: TextStyle;
    dataset?: Dataset;
  }

  type DatasetSource =
    | Array<Array<string | number> | { [key: string]: string | number }>
    | { [key: string]: Array<string | number> };

  interface DataSet {
    source: DatasetSource;
  }

  interface Axis {
    name?: string;
    show?: boolean;
    data?: Data[];
    axisLine?: AxisLine;
    axisLabel?: AxisLabel;
    axisTick?: AxisTick;
    splitLine?: SplitLine;
    type?: AxisType;
    inverse?: boolean;
    offset?: number;
    gridIndex?: number;
  }

  type AxisType = 'category' | 'value' | 'time' | 'log';

  interface YAxis extends Axis {
    position?: 'left' | 'right';
  }

  interface XAxis extends Axis {
    position?: 'top' | 'bottom';
  }

  interface Data {
    value: string | number;
    textStyle?: TextStyle;
  }

  interface TextStyle {
    color?: string;
    fontStyle?: string;
    fontSize?: number;
    fontFamily?: string;
  }

  interface AxisLine {
    show?: boolean;
    lineStyle?: AxisLineStyle;
  }

  interface AxisLabel {
    formatter?: ((value: string | number, index: number) => void) | string;
  }

  interface AxisTick {
    show?: boolean;
    alignWithLabel?: boolean;
    interval?: 'auto' | number;
    length?: number;
    inside?: boolean;
    lineStyle?: LineStyle;
  }

  interface SplitLine {
    show?: boolean;
    lineStyle?: SplitLineStyle;
  }

  interface LineStyle {
    color?: string;
    width?: number;
    type?: 'solid' | 'dashed' | 'dotted';
    opacity?: number;
  }

  type AxisLineStyle = LineStyle;
  type SplitLineStyle = LineStyle;

  interface Grid {
    show?: boolean;
    left?: string | number;
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
  }

  interface Series {
    name?: string;
    type: 'line' | 'bar' | 'pie';
    data?: any[]; // FIXME: give a proper type - not sure it's possible
    encode?: SeriesEncode;
    seriesLayoutBy?: 'column' | 'row';
    xAxisIndex?: number;
    yAxisIndex?: number;
    label?: SeriesLabel;
  }

  interface SeriesLabel {
    normal?: {
      show?: boolean;
      position?: 'inside' | 'outside' | 'center';
      formatter?: string;
    };
  }

  interface SeriesEncode {
    x?: string | number[];
    y?: string | number[];
    tooltip?: string | number[];
  }
}
