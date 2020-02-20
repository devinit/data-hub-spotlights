import React, { FunctionComponent } from 'react';
import {
  SpotlightIndicator,
  LocationIndicatorData,
  LocationData,
  processTemplateString,
  TemplateOptions,
  SpotlightLocation
} from '../../utils';
import { IndicatorStat } from '../IndicatorStat';

interface KeyFactIndicatorProps {
  location: SpotlightLocation;
  indicator: SpotlightIndicator;
  data?: LocationIndicatorData;
  dataLoading?: boolean;
}

const getValue = (data?: LocationData): string => (data && data.value ? data.value.toFixed(2) : 'No Data');

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
      value={`${indicator.value_prefix || ''} ${data && getValue(data.data[0])} ${indicator.value_suffix || ''}`}
    />
  );
};

export { KeyFactIndicator };
