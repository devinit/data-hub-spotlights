import dynamic from 'next/dynamic';
import React, { FunctionComponent } from 'react';
import {
  processTemplateString,
  SpotlightIndicator,
  SpotlightIndicatorContent,
  SpotlightLocation,
  TemplateOptions
} from '../../utils';
import { IndicatorChartDataHandler, IndicatorStat, IndicatorStatDataHandler } from '../IndicatorStat';

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
          {contentOptions.map(({ stat, chart }, index) => {
            if (stat) {
              return (
                <IndicatorStat
                  key={index}
                  heading={processTemplateString(stat.title || '', templateOptions)}
                  meta={stat.meta || { description: indicator.description, source: indicator.source }}
                >
                  <DynamicDataLoader
                    indicators={stat.indicators}
                    geocodes={!stat.fetchAll ? [location.geocode] : undefined}
                    startYear={stat.startYear || stat.endYear || indicator.start_year || indicator.end_year}
                    endYear={stat.endYear || stat.startYear || indicator.end_year || indicator.start_year}
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
            if (chart) {
              return (
                <IndicatorStat
                  key={index}
                  heading={processTemplateString(chart.title || '', templateOptions)}
                  meta={chart.meta || { description: indicator.description, source: indicator.source }}
                >
                  <DynamicDataLoader
                    indicators={chart.indicators}
                    geocodes={!chart.fetchAll ? [location.geocode] : undefined}
                    startYear={chart.startYear || chart.endYear || indicator.start_year || indicator.end_year}
                  >
                    <IndicatorChartDataHandler {...chart} />
                  </DynamicDataLoader>
                </IndicatorStat>
              );
            }

            return null;
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
          geocodes={[location.geocode]}
          startYear={indicator.start_year || indicator.end_year}
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
