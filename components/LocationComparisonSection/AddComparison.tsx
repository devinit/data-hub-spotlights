import React, { FunctionComponent } from 'react';
import { SpotlightBanner, SpotlightBannerAside } from '../SpotlightBanner';
import { PageSection } from '../PageSection';
import { AddLocation } from './AddLocation';

interface AddComparisonProps {
  onAddComparison: (widgetState?: boolean, tagName?: string) => void;
}

const AddComparison: FunctionComponent<AddComparisonProps> = ({ onAddComparison }) => {
  return (
    <PageSection>
      <SpotlightBanner>
        <SpotlightBannerAside>
          <AddLocation active={true} label={'Add another comparison'} onWidgetClick={onAddComparison}></AddLocation>
        </SpotlightBannerAside>
      </SpotlightBanner>
    </PageSection>
  );
};

export { AddComparison };
