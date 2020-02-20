import React, { FunctionComponent, ReactNode } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightLocation, SpotlightTheme } from '../../utils';
import { SpotlightTab } from '../SpotlightTab';
import { TabContainer } from '../SpotlightTab/TabContainer';
import { TabContent } from '../SpotlightTab/TabContent';
import { TabContentHeader } from '../SpotlightTab/TabContentHeader';

interface KeyFactsSectionProps {
  location?: SpotlightLocation;
  themes: SpotlightTheme[];
}

const KeyFactsSection: FunctionComponent<KeyFactsSectionProps> = ({ location, themes }) => {
  if (!location) {
    return null;
  }

  const renderTabs = (): ReactNode =>
    themes.map(theme => (
      <TabContainer key={theme.slug} id={theme.slug} label={theme.name}>
        <TabContent>
          <TabContentHeader>{theme.name} Content</TabContentHeader>
          <div>Other Content</div>
        </TabContent>
      </TabContainer>
    ));

  return (
    <PageSection dark wide>
      <PageSectionHeading>Key facts for {location.name}</PageSectionHeading>
      <SpotlightTab>{renderTabs()}</SpotlightTab>
    </PageSection>
  );
};

export { KeyFactsSection };
