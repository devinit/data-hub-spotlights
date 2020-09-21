import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import {
  CountryContext,
  LocationContext,
  SpotlightIndicator,
  SpotlightOptions,
  SpotlightTheme,
  toCamelCase,
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
  const onCompare = (selectns: [SpotlightOptions, SpotlightOptions]): void => {
    if (selections) {
      if (
        selectns[0].indicator?.name !== selections[0].indicator?.name ||
        selectns[1].indicator?.name !== selections[1].indicator?.name ||
        selectns[0].year !== selections[0].year ||
        selectns[1].year !== selections[1].year
      ) {
        setSelections(selectns);
        setLoading(true);
      }
    } else {
      setSelections(selectns);
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
        <IndicatorComparisonDataLoader options={selections} loading={loading} location={location}>
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
