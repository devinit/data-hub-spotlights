import React, { FunctionComponent } from 'react';
import {
  processTemplateString,
  SpotlightIndicator,
  SpotlightIndicatorContent,
  SpotlightLocation,
  TemplateOptions
} from '../../utils';
import { IndicatorChartDataHandler, IndicatorStat, IndicatorStatDataHandler } from '../IndicatorStat';
import { setDecimalCount } from '../IndicatorStat/utils';
import { ErrorBoundary } from '../ErrorBoundary';

interface KeyFactIndicatorProps {
  location: SpotlightLocation;
  indicator: SpotlightIndicator;
  currencyCode: string;
  useLocalValue: boolean;
}

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
              const suffix = stat.valueSuffix || indicator.value_suffix;

              return (
                <IndicatorStat
                  key={index}
                  heading={processTemplateString(stat.title || '', templateOptions)}
                  meta={stat.meta || { description: indicator.description, source: indicator.source }}
                >
                  <ErrorBoundary>
                    <IndicatorStatDataHandler
                      dataOptions={{
                        indicators: stat.indicators,
                        geocodes: stat.fetchAll ? [location.geocode] : undefined,
                        startYear: stat.startYear || stat.endYear || indicator.start_year || indicator.end_year,
                        endYear: stat.endYear || stat.startYear || indicator.end_year || indicator.start_year,
                        filter: stat.filter
                      }}
                      valueOptions={{
                        location,
                        useLocalValue: props.useLocalValue,
                        prefix:
                          stat.dataFormat === 'currency' && props.useLocalValue
                            ? props.currencyCode
                            : stat.valuePrefix || indicator.value_prefix,
                        suffix: suffix,
                        dataFormat: stat.dataFormat || indicator.data_format,
                        aggregation: stat.aggregation,
                        decimalCount: setDecimalCount(suffix, stat.decimalCount)
                      }}
                      note={stat.note}
                    />
                  </ErrorBoundary>
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
                  <IndicatorChartDataHandler
                    dataOptions={{
                      indicators: chart.indicators,
                      geocodes: !chart.fetchAll ? [location.geocode] : undefined,
                      startYear: chart.startYear || chart.endYear || indicator.start_year || indicator.end_year,
                      endYear: chart.endYear || chart.startYear || indicator.end_year || indicator.start_year
                    }}
                    {...chart}
                  />
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
        <IndicatorStatDataHandler
          dataOptions={{
            indicators: [indicator.ddw_id],
            geocodes: [location.geocode],
            startYear: indicator.start_year || indicator.end_year
          }}
          valueOptions={{
            location,
            useLocalValue: props.useLocalValue,
            dataFormat: indicator.data_format,
            prefix:
              indicator.data_format === 'currency' && props.useLocalValue ? props.currencyCode : indicator.value_prefix,
            suffix: indicator.value_suffix,
            decimalCount: setDecimalCount(indicator.value_suffix, undefined)
          }}
        />
      </IndicatorStat>
    </div>
  );
};

KeyFactIndicator.defaultProps = {
  useLocalValue: false
};

export { KeyFactIndicator };
