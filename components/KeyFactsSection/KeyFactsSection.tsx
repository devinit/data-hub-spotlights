import React, { FunctionComponent, ReactNode, useState } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightTab } from '../SpotlightTab';
import { TabContainer } from '../SpotlightTab/TabContainer';
import { TabContent } from '../SpotlightTab/TabContent';
import { TabContentHeader } from '../SpotlightTab/TabContentHeader';
import { KeyFactsSectionProps } from './utils';
import { KeyFactIndicator } from '../KeyFactIndicator';
import dynamic from 'next/dynamic';

const DynamicDataLoader = dynamic(() => import('../DDWDataLoader').then(mod => mod.DDWDataLoader), { ssr: false });

const KeyFactsSection: FunctionComponent<KeyFactsSectionProps> = ({ location, themes }) => {
  if (!location) {
    return null;
  }
  const [activeIndex, setActiveIndex] = useState(0);

  const renderTabs = (): ReactNode =>
    themes.map((theme, index) => (
      <TabContainer key={theme.slug} id={theme.slug} label={theme.name} active={index === activeIndex}>
        <TabContent>
          <TabContentHeader onClick={(): void => setActiveIndex(index)} />
          <div className="l-2up-3up">
            {theme.indicators.map((indicator, index) => (
              <DynamicDataLoader key={index} indicator={indicator.ddw_id} geocode={location.geocode}>
                <KeyFactIndicator location={location} indicator={indicator} />
              </DynamicDataLoader>
            ))}
          </div>
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
