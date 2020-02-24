import React, { FunctionComponent } from 'react';
import { LocationIndicatorData } from '../../utils';
import { getIndicatorValue, ValueOptions, getIndicatorsValue } from '../KeyFactIndicator/utils';
import { IndicatorStatDataViewer } from './IndicatorStatDataViewer';

interface DataHandlerProps {
  data?: LocationIndicatorData[];
  dataLoading?: boolean;
  valueOptions?: ValueOptions;
}

const IndicatorStatDataHandler: FunctionComponent<DataHandlerProps> = ({ data, dataLoading, ...props }) => {
  if (!dataLoading && data) {
    if (data.length === 1) {
      return <IndicatorStatDataViewer value={getIndicatorValue(data[0].data, props.valueOptions)} />;
    }

    return <IndicatorStatDataViewer value={getIndicatorsValue(data, props.valueOptions)} />;
  }

  return <div>Loading ...</div>;
};

IndicatorStatDataHandler.defaultProps = { valueOptions: { dataFormat: 'plain' } };

export { IndicatorStatDataHandler };
