import React, { FunctionComponent, ReactNode, useState } from 'react';
import { KeyFactTab } from '../KeyFactTab';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightTab } from '../SpotlightTab';
import { KeyFactsSectionProps } from './utils';

const KeyFactsSection: FunctionComponent<KeyFactsSectionProps> = ({ location, themes, currencyCode }) => {
  if (!location) {
    return null;
  }
  const [activeIndex, setActiveIndex] = useState(0);

  const renderTabs = (): ReactNode =>
    themes.map((theme, index) => (
      <KeyFactTab
        key={index}
        currencyCode={currencyCode}
        theme={theme}
        active={index === activeIndex}
        location={location}
        onActivate={(): void => setActiveIndex(index)}
      />
    ));

  return (
    <PageSection dark wide>
      <PageSectionHeading>Key facts for {location.name}</PageSectionHeading>
      <SpotlightTab>{renderTabs()}</SpotlightTab>
    </PageSection>
  );
};

export { KeyFactsSection };
