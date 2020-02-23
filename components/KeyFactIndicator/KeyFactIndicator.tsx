import dynamic from 'next/dynamic';
import React, { FunctionComponent } from 'react';
import { SpotlightIndicator, SpotlightIndicatorContent, SpotlightLocation, TemplateOptions } from '../../utils';
import { ValueOptions } from './utils';
import { IndicatorStatDataHandler } from '../IndicatorStat';

interface KeyFactIndicatorProps {
  location: SpotlightLocation;
  indicator: SpotlightIndicator;
  valueOptions?: ValueOptions;
}

const DynamicDataLoader = dynamic(() => import('../DDWDataLoader').then(mod => mod.DDWDataLoader), { ssr: false });

const KeyFactIndicator: FunctionComponent<KeyFactIndicatorProps> = ({ indicator, ...props }) => {
  if (indicator.content_template) {
    try {
      const contentOptions: SpotlightIndicatorContent = JSON.parse(indicator.content_template);
      console.log(contentOptions);
    } catch (error) {
      console.log(error.message);
    }

    return <div>Content Goes Here</div>; // TODO: add proper handling for this path
  }

  const templateOptions: TemplateOptions = {
    location: props.location.name
  };

  return (
    <DynamicDataLoader
      indicators={[indicator.ddw_id]}
      geocode={props.location.geocode}
      year={indicator.start_year || indicator.end_year}
    >
      <IndicatorStatDataHandler
        indicator={indicator}
        valueOptions={props.valueOptions}
        templateOptions={templateOptions}
      />
    </DynamicDataLoader>
  );
};

KeyFactIndicator.defaultProps = {
  valueOptions: { dataFormat: 'plain' }
};

export { KeyFactIndicator };
