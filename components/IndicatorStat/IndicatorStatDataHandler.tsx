import React, { FunctionComponent } from 'react';
import { LocationIndicatorData } from '../../utils';
import { formatValue, ValueOptions } from '../KeyFactIndicator/utils';
import { IndicatorStatDataViewer } from './IndicatorStatDataViewer';

interface DataHandlerProps {
  data?: LocationIndicatorData;
  dataLoading?: boolean;
  valueOptions?: ValueOptions;
}

const IndicatorStatDataHandler: FunctionComponent<DataHandlerProps> = ({ data, dataLoading, ...props }) => {
  if (!dataLoading) {
    return <IndicatorStatDataViewer value={formatValue(data && data.data, props.valueOptions)} />;
  }

  return <div>Loading ...</div>;
};

IndicatorStatDataHandler.defaultProps = { valueOptions: { dataFormat: 'plain' } };

export { IndicatorStatDataHandler };
