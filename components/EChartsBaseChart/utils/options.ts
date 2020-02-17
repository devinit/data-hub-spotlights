export const axisDefaults: Partial<ECharts.Axis> = {
  axisLine: {
    lineStyle: { color: '#443e42' }
  },
  splitLine: {
    show: false,
    lineStyle: { color: '#ccc' }
  }
};

export const defaults: Partial<ECharts.Options> = {
  color: ['#8f1b13', '#e84439', '#f0826d', '#f5aa9b', '#fad1c9'],
  yAxis: {
    ...axisDefaults
  },
  xAxis: axisDefaults,
  textStyle: {
    fontFamily: 'Geomanist Regular,sans-serif'
  }
};
