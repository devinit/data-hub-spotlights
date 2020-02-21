import dynamic from 'next/dynamic';
import React, { FunctionComponent, useState } from 'react';
import { SpotlightLocation, SpotlightTheme } from '../../utils';
import { KeyFactIndicator } from '../KeyFactIndicator';
import { CurrencySelector } from '../KeyFactsSection/CurrencySelector';
import { TabContainer } from '../SpotlightTab/TabContainer';
import { TabContent } from '../SpotlightTab/TabContent';
import { TabContentHeader } from '../SpotlightTab/TabContentHeader';

interface KeyFactTabProps {
  theme: SpotlightTheme;
  active?: boolean;
  location: SpotlightLocation;
  onActivate?: () => void;
  currencyCode: string;
}

const DynamicDataLoader = dynamic(() => import('../DDWDataLoader').then(mod => mod.DDWDataLoader), { ssr: false });

const KeyFactTab: FunctionComponent<KeyFactTabProps> = ({ active, location, theme, onActivate, currencyCode }) => {
  const [useLocalCurrency, setUseLocalCurrency] = useState(false);
  console.log(useLocalCurrency);

  const onChangeCurrency = (isLocal: boolean): void => setUseLocalCurrency(isLocal);

  return (
    <TabContainer key={theme.slug} id={theme.slug} label={theme.name} active={active}>
      <TabContent>
        <TabContentHeader onClick={onActivate}>
          <CurrencySelector currencyCode={currencyCode} onChange={onChangeCurrency} />
        </TabContentHeader>
        <div className="l-2up-3up">
          {theme.indicators.map((indicator, index) => (
            <DynamicDataLoader key={index} indicator={indicator.ddw_id} geocode={location.geocode}>
              <KeyFactIndicator location={location} indicator={indicator} useLocalCurrency={useLocalCurrency} />
            </DynamicDataLoader>
          ))}
        </div>
      </TabContent>
    </TabContainer>
  );
};

export { KeyFactTab };
