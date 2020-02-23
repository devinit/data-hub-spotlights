import React, { FunctionComponent } from 'react';
import { LocationIndicatorData, SpotlightIndicator, processTemplateString, TemplateOptions } from '../../utils';
import { ValueOptions, formatValue } from '../KeyFactIndicator/utils';
import { IndicatorStat } from '.';

interface DataHandlerProps {
  data?: LocationIndicatorData;
  dataLoading?: boolean;
  indicator: SpotlightIndicator;
  valueOptions?: ValueOptions;
  templateOptions?: TemplateOptions;
}

const IndicatorStatDataHandler: FunctionComponent<DataHandlerProps> = ({ data, dataLoading, indicator, ...props }) => {
  if (!dataLoading) {
    return (
      <IndicatorStat
        heading={processTemplateString(indicator.name, props.templateOptions || {})}
        description={indicator.description}
        source={indicator.source}
        value={formatValue(data && data.data, props.valueOptions)}
      />
    );
  }

  return <div>Loading ...</div>;
};

IndicatorStatDataHandler.defaultProps = { templateOptions: {}, valueOptions: { dataFormat: 'plain' } };

export { IndicatorStatDataHandler };
