import { EChartOption } from 'echarts';

export const axisDefaults: Partial<EChartOption.BasicComponents.CartesianAxis> = {
  axisLine: {
    lineStyle: { color: '#ddd' }
  },
  axisLabel: {
    color: '#32313f'
  },
  splitLine: {
    show: false,
    lineStyle: { color: '#ccc' }
  }
};

export const defaults: Partial<EChartOption> = {
  color: ['#ec6250', '#6c120a', '#f4a57c', '#7a2e05', '#fac47e', '#7d4712', '#e05c86', '#65093d', '#af73ae', '#42184c'],
  yAxis: {
    ...axisDefaults
  },
  xAxis: axisDefaults,
  textStyle: {
    fontFamily: 'Geomanist Regular,sans-serif'
  }
};
