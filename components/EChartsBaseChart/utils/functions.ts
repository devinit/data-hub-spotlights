import { EChartOption } from 'echarts';

export const toBasicAxisData = (values: (string | number)[]): EChartOption.BasicComponents.CartesianAxis.DataObject[] =>
  values.map((value) => ({ value: value }));
