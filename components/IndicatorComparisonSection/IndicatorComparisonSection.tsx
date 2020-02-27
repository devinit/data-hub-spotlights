import React, { FunctionComponent } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightLocation, SpotlightTheme } from '../../utils';

export interface IndicatorComparisonSectionProps {
  location?: SpotlightLocation;
  themes: SpotlightTheme[];
  countryCode: string;
  countryName: string;
}

const IndicatorComparisonSection: FunctionComponent<IndicatorComparisonSectionProps> = props => {
  const { location, countryName } = props;

  return (
    <PageSection dark wide>
      <PageSectionHeading>Compare indicators for {location ? location.name : countryName}</PageSectionHeading>
    </PageSection>
  );
};

export { IndicatorComparisonSection };
