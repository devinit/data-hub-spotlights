import React, { FunctionComponent, useEffect, useState } from 'react';
import { SpotlightIndicator, SpotlightLocation, SpotlightOptions, SpotlightTheme, toCamelCase } from '../../utils';
import { ComparisonChartDataHandler } from '../ComparisonChartDataHandler';
import { IndicatorComparisonColumnChart } from '../IndicatorComparisonColumnChart';
import { IndicatorComparisonDataLoader } from '../IndicatorComparisonDataLoader';
import { LocationComparisonBarChart } from '../LocationComparisonBarChart';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightHeading } from '../SpotlightHeading';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { VisualisationSection, VisualisationSectionMain } from '../VisualisationSection';
import { IndicatorSelectionBanner } from './IndicatorSelectionBanner';

export interface IndicatorComparisonSectionProps {
  location?: SpotlightLocation;
  themes: SpotlightTheme[];
  countryCode: string;
  countryName: string;
}

const IndicatorComparisonSection: FunctionComponent<IndicatorComparisonSectionProps> = props => {
  const { location, themes, countryName, countryCode } = props;
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState<[SpotlightOptions, SpotlightOptions] | undefined>(undefined);
  const onCompare = (_selections: [SpotlightOptions, SpotlightOptions]): void => {
    if (selections) {
      if (
        _selections[0].indicator?.name !== selections[0].indicator?.name ||
        _selections[1].indicator?.name !== selections[1].indicator?.name ||
        _selections[0].year !== selections[0].year ||
        _selections[1].year !== selections[1].year
      ) {
        setSelections(_selections);
        setLoading(true);
      }
    } else {
      setSelections(_selections);
      setLoading(true);
    }
  };
  const onLoad = (): void => setLoading(false);
  useEffect(() => setLoading(true), [location]);

  return (
    <PageSection wide dark={!location}>
      <PageSectionHeading>
        Compare indicators for {toCamelCase(location ? location.name : countryName)}
      </PageSectionHeading>
      <IndicatorSelectionBanner themes={themes} onCompare={onCompare} compareOnLoad />
      {selections ? (
        <VisualisationSection className="spotlight--leader">
          {location ? (
            <SpotlightSidebar width="100%">
              <SpotlightHeading>{toCamelCase(location ? location.name : countryName)}</SpotlightHeading>
              <SpotlightInteractive>
                <IndicatorComparisonDataLoader
                  options={selections}
                  onLoad={onLoad}
                  loading={loading}
                  locations={location && [location]}
                >
                  <ComparisonChartDataHandler
                    countryCode={countryCode}
                    locations={props.location && [props.location]}
                    indicators={selections.map(sel => sel.indicator) as [SpotlightIndicator, SpotlightIndicator]}
                  >
                    <IndicatorComparisonColumnChart height="500px" />
                  </ComparisonChartDataHandler>
                </IndicatorComparisonDataLoader>
              </SpotlightInteractive>
            </SpotlightSidebar>
          ) : (
            <VisualisationSectionMain width="100%">
              <SpotlightHeading>Locations in {toCamelCase(countryName)}</SpotlightHeading>
              <SpotlightInteractive maxHeight="500px" background="#ffffff">
                <IndicatorComparisonDataLoader
                  options={selections}
                  onLoad={onLoad}
                  loading={loading}
                  locations={location && [location]}
                >
                  <ComparisonChartDataHandler
                    countryCode={countryCode}
                    locations={props.location && [props.location]}
                    indicators={selections.map(sel => sel.indicator) as [SpotlightIndicator, SpotlightIndicator]}
                  >
                    <LocationComparisonBarChart />
                  </ComparisonChartDataHandler>
                </IndicatorComparisonDataLoader>
              </SpotlightInteractive>
            </VisualisationSectionMain>
          )}
        </VisualisationSection>
      ) : null}
    </PageSection>
  );
};

export { IndicatorComparisonSection };
