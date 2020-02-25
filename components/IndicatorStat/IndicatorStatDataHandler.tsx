import React, { FunctionComponent } from 'react';
import { LocationIndicatorData, ContentNote } from '../../utils';
import { getIndicatorValue, ValueOptions, getIndicatorsValue } from './utils';
import { IndicatorStatDataViewer } from './IndicatorStatDataViewer';

interface DataHandlerProps {
  data?: LocationIndicatorData[];
  dataLoading?: boolean;
  valueOptions?: ValueOptions;
  note?: ContentNote;
}

const IndicatorStatDataHandler: FunctionComponent<DataHandlerProps> = ({ data, dataLoading, ...props }) => {
  if (!dataLoading && data) {
    if (data.length === 1) {
      return <IndicatorStatDataViewer value={getIndicatorValue(data[0].data, props.valueOptions)} note={props.note} />;
    }

    return <IndicatorStatDataViewer value={getIndicatorsValue(data, props.valueOptions)} note={props.note} />;
  }

  return <div>Loading ...</div>;
};

IndicatorStatDataHandler.defaultProps = { valueOptions: { dataFormat: 'plain' } };

export { IndicatorStatDataHandler };
