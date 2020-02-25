import dynamic from 'next/dynamic';
import React, { FunctionComponent } from 'react';
import {
  SpotlightIndicator,
  SpotlightIndicatorContent,
  SpotlightLocation,
  TemplateOptions,
  processTemplateString
} from '../../utils';
import { IndicatorStatDataHandler, IndicatorStat } from '../IndicatorStat';

interface KeyFactIndicatorProps {
  location: SpotlightLocation;
  indicator: SpotlightIndicator;
  currencyCode: string;
  useLocalValue: boolean;
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
                  key={index}
                  heading={processTemplateString(heading, templateOptions)}
                  meta={stat.meta || { description: indicator.description, source: indicator.source }}
                >
                  <DynamicDataLoader
                    indicators={stat.indicators}
                    geocode={!stat.fetchAll ? location.geocode : undefined}
                    year={stat.startYear || stat.endYear || indicator.start_year || indicator.end_year}
                  >
                    <IndicatorStatDataHandler
                      valueOptions={{
                        location,
                        useLocalValue: props.useLocalValue,
                        prefix:
                          stat.dataFormat === 'currency' && props.useLocalValue
                            ? props.currencyCode
                            : stat.valuePrefix || indicator.value_prefix,
                        suffix: stat.valueSuffix || indicator.value_suffix,
                        dataFormat: stat.dataFormat || indicator.data_format,
                        aggregation: stat.aggregation
                      }}
                      note={stat.note}
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
        meta={{ description: indicator.description, source: indicator.source }}
      >
        <DynamicDataLoader
          indicators={[indicator.ddw_id]}
          geocode={location.geocode}
          year={indicator.start_year || indicator.end_year}
        >
          <IndicatorStatDataHandler
            valueOptions={{
              location,
              useLocalValue: props.useLocalValue,
              dataFormat: indicator.data_format,
              prefix:
                indicator.data_format === 'currency' && props.useLocalValue
                  ? props.currencyCode
                  : indicator.value_prefix,
              suffix: indicator.value_suffix
            }}
          />
        </DynamicDataLoader>
      </IndicatorStat>
    </div>
  );
};

KeyFactIndicator.defaultProps = {
  useLocalValue: false
};

export { KeyFactIndicator };
