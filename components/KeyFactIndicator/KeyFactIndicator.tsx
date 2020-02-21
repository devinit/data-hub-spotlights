import React, { FunctionComponent } from 'react';
import {
  LocationIndicatorData,
  processTemplateString,
  SpotlightIndicator,
  SpotlightLocation,
  TemplateOptions
} from '../../utils';
import { IndicatorStat } from '../IndicatorStat';
import { formatValue, ValueOptions } from './utils';

interface KeyFactIndicatorProps {
  location: SpotlightLocation;
  indicator: SpotlightIndicator;
  data?: LocationIndicatorData;
  dataLoading?: boolean;
  valueOptions?: ValueOptions;
}

const KeyFactIndicator: FunctionComponent<KeyFactIndicatorProps> = ({ indicator, data, dataLoading, ...props }) => {
  if (indicator.content_template) {
    return null; // TODO: add proper handling for this path
  }

  if (dataLoading) {
    return <div>Loading ...</div>;
  }
  const templateOptions: TemplateOptions = {
    location: props.location.name
  };

  return (
    <IndicatorStat
      heading={processTemplateString(indicator.name, templateOptions)}
      description={indicator.description}
      source={indicator.source}
      value={formatValue(data && data.data, props.valueOptions)}
    />
  );
};

KeyFactIndicator.defaultProps = {
  valueOptions: {}
};

export { KeyFactIndicator };
