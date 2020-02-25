import dynamic from 'next/dynamic';
import React, { FunctionComponent } from 'react';
import {
  SpotlightIndicator,
  SpotlightIndicatorContent,
  SpotlightLocation,
  TemplateOptions,
  processTemplateString
} from '../../utils';
import { ValueOptions } from '../IndicatorStat/utils';
import { IndicatorStatDataHandler, IndicatorStat } from '../IndicatorStat';

interface KeyFactIndicatorProps {
  location: SpotlightLocation;
  indicator: SpotlightIndicator;
  valueOptions?: ValueOptions;
  currencyCode: string;
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
        <div className="l-2up-3up__col">
          {contentOptions.map(({ stat }, index) => {
            if (stat) {
              const heading = stat.title || indicator.name;

              return (
                <IndicatorStat
                  heading={processTemplateString(heading, templateOptions)}
                  description={stat.description || indicator.description}
                  source={stat.source || indicator.source}
                >
                  <DynamicDataLoader
                    key={index}
                    indicators={stat.indicators}
                    geocode={location.geocode}
                    year={stat.startYear || stat.endYear || indicator.start_year || indicator.end_year}
                  >
                    <IndicatorStatDataHandler
                      valueOptions={{
                        ...props.valueOptions,
                        prefix:
                          stat.dataFormat === 'currency' && props.valueOptions?.useLocalValue
                            ? props.currencyCode
                            : stat.valuePrefix || props.valueOptions?.prefix,
                        suffix: stat.valueSuffix || props.valueOptions?.suffix,
                        dataFormat: stat.dataFormat || props.valueOptions?.dataFormat,
                        aggregation: stat.aggregation
                      }}
                    />
                  </DynamicDataLoader>
                </IndicatorStat>
              );
            }

            return <div key={index}>Chart Goes Here</div>; // TODO: add proper handling for this path
          })}
        </div>
      );
    } catch (error) {
      console.log(error.message);
    }

    return <div>No Data</div>;
  }

  return (
    <div className="l-2up-3up__col">
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
    </div>
  );
};

KeyFactIndicator.defaultProps = {
  valueOptions: { dataFormat: 'plain' }
};

export { KeyFactIndicator };
