import dynamic from 'next/dynamic';
import React, { FunctionComponent } from 'react';
import {
  SpotlightIndicator,
  SpotlightIndicatorContent,
  SpotlightLocation,
  TemplateOptions,
  processTemplateString
} from '../../utils';
import { ValueOptions } from './utils';
import { IndicatorStatDataHandler, IndicatorStat } from '../IndicatorStat';

interface KeyFactIndicatorProps {
  location: SpotlightLocation;
  indicator: SpotlightIndicator;
  valueOptions?: ValueOptions;
}

const DynamicDataLoader = dynamic(() => import('../DDWDataLoader').then(mod => mod.DDWDataLoader), { ssr: false });

const KeyFactIndicator: FunctionComponent<KeyFactIndicatorProps> = ({ indicator, location, ...props }) => {
  const templateOptions: TemplateOptions = {
    location: location.name
  };

  if (indicator.content_template) {
    try {
      const contentOptions: SpotlightIndicatorContent[] = JSON.parse(indicator.content_template);

      return (
        <IndicatorStat
          heading={processTemplateString(indicator.name, templateOptions)}
          description={indicator.description}
          source={indicator.source}
        >
          {contentOptions.map(({ stat }, index) => {
            if (stat) {
              return (
                <DynamicDataLoader
                  key={index}
                  indicators={stat.indicators}
                  geocode={location.geocode}
                  year={stat.start_year || stat.end_year}
                >
                  <IndicatorStatDataHandler valueOptions={props.valueOptions} />
                </DynamicDataLoader>
              );
            }

            return <div key={index}>Content Goes Here</div>; // TODO: add proper handling for this path
          })}
        </IndicatorStat>
      );
    } catch (error) {
      console.log(error.message);
    }

    return <div>No Data</div>;
  }

  return (
    <IndicatorStat
      heading={processTemplateString(indicator.name, templateOptions)}
      description={indicator.description}
      source={indicator.source}
    >
      <DynamicDataLoader
        indicators={[indicator.ddw_id]}
        geocode={location.geocode}
        year={indicator.start_year || indicator.end_year}
      >
        <IndicatorStatDataHandler valueOptions={props.valueOptions} />
      </DynamicDataLoader>
    </IndicatorStat>
  );
};

KeyFactIndicator.defaultProps = {
  valueOptions: { dataFormat: 'plain' }
};

export { KeyFactIndicator };
