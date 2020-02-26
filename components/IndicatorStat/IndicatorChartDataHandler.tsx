import React, { FunctionComponent } from 'react';
import { LocationIndicatorData, IndicatorChart } from '../../utils';
import { IndicatorStatChart } from './IndicatorStatChart';
import { generateChartOptions } from './utils';

interface DataHandlerProps extends IndicatorChart {
  data?: LocationIndicatorData[];
  dataLoading?: boolean;
}

const IndicatorChartDataHandler: FunctionComponent<DataHandlerProps> = ({ data, dataLoading, ...configs }) => {
  if (!dataLoading && data) {
    if (data.length === 1) {
      return <IndicatorStatChart options={generateChartOptions(configs, data)} />;
    }
    console.log('TODO: handled charts built from multiple indicators');

    // TODO: handle charts built from multiple indicators

    return <div>No Data</div>;
  }

  return <div>Loading ...</div>;
};

export { IndicatorChartDataHandler };
