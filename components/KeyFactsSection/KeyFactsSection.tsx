import React, { FunctionComponent } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightLocation } from '../../utils';

interface KeyFactsSectionProps {
  location?: SpotlightLocation;
}

const KeyFactsSection: FunctionComponent<KeyFactsSectionProps> = ({ location }) => {
  if (!location) {
    return null;
  }

  return (
    <PageSection dark wide>
      <PageSectionHeading>Key facts for {location.name}</PageSectionHeading>
    </PageSection>
  );
};

export { KeyFactsSection };
