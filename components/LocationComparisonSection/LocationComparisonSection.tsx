import React, { FunctionComponent } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerMain } from '../SpotlightBanner';
import { AddLocation } from './AddLocation';

const LocationComparisonSection: FunctionComponent = () => {
  return (
    <PageSection>
      <PageSectionHeading>Location Comparison</PageSectionHeading>
      <SpotlightBanner>
        <SpotlightBannerAside>
          <AddLocation label={'Add Location'} />
        </SpotlightBannerAside>
        <SpotlightBannerMain></SpotlightBannerMain>
      </SpotlightBanner>
    </PageSection>
  );
};

export { LocationComparisonSection };
