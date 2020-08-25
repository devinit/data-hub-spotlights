import React, { FunctionComponent, useEffect, useState, useContext } from 'react';
import {
  SpotlightIndicator,
  SpotlightOptions,
  SpotlightTheme,
  toCamelCase,
  LocationContext,
  CountryContext,
} from '../../utils';
import { ComparisonChartDataHandler } from '../ComparisonChartDataHandler';
import { IndicatorComparisonDataLoader } from '../IndicatorComparisonDataLoader';
import { PageSection, PageSectionHeading } from '../PageSection';
import { IndicatorSelectionBanner } from './IndicatorSelectionBanner';

export interface IndicatorComparisonSectionProps {
  themes: SpotlightTheme[];
}

const IndicatorComparisonSection: FunctionComponent<IndicatorComparisonSectionProps> = (props) => {
  const { themes } = props;
  const { countryName } = useContext(CountryContext);
  const location = useContext(LocationContext);
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
  useEffect(() => setLoading(true), [location]);

  return (
    <PageSection wide>
      <PageSectionHeading>
        Compare indicators for {toCamelCase(location ? location.name : countryName)}
      </PageSectionHeading>
      <IndicatorSelectionBanner themes={themes} onCompare={onCompare} compareOnLoad />
      {selections ? (
        <IndicatorComparisonDataLoader options={selections} loading={loading} locations={location ? [location] : []}>
          <ComparisonChartDataHandler
            location={location}
            indicators={selections.map((sel) => sel.indicator) as [SpotlightIndicator, SpotlightIndicator]}
          />
        </IndicatorComparisonDataLoader>
      ) : (
        <div>Please Select to Compare</div>
      )}
    </PageSection>
  );
};

export { IndicatorComparisonSection };
