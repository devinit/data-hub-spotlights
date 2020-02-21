import React, { FunctionComponent } from 'react';
import {
  LocationIndicatorData,
  processTemplateString,
  SpotlightIndicator,
  SpotlightLocation,
  TemplateOptions
} from '../../utils';
import { IndicatorStat } from '../IndicatorStat';
import { formatValue } from './utils';

interface KeyFactIndicatorProps {
  location: SpotlightLocation;
  indicator: SpotlightIndicator;
  data?: LocationIndicatorData;
  dataLoading?: boolean;
  useLocalCurrency?: boolean; // only used where applicable
}

const KeyFactIndicator: FunctionComponent<KeyFactIndicatorProps> = ({ location, indicator, data, dataLoading }) => {
  if (indicator.content_template) {
    return null; // TODO: add proper handling for this path
  }

  if (dataLoading) {
    return <div>Loading ...</div>;
  }
  const templateOptions: TemplateOptions = {
    location: location.name
  };

  return (
    <IndicatorStat
      heading={processTemplateString(indicator.name, templateOptions)}
      description={indicator.description}
      source={indicator.source}
      value={formatValue(data && data.data, indicator.value_prefix, indicator.value_suffix)}
    />
  );
};

export { KeyFactIndicator };
