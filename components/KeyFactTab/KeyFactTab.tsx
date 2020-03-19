import React, { FunctionComponent, useState } from 'react';
import { SpotlightLocation, SpotlightTheme } from '../../utils';
import { CurrencySelector } from '../CurrencySelector';
import { KeyFactIndicator } from '../KeyFactIndicator';
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

const KeyFactTab: FunctionComponent<KeyFactTabProps> = ({ active, location, theme, onActivate, currencyCode }) => {
  const [useLocalValue, setUseLocalValue] = useState(false);

  const onChangeCurrency = (isLocal: boolean): void => setUseLocalValue(isLocal);

  return (
    <TabContainer key={theme.slug} id={theme.slug} label={theme.name} active={active}>
      <TabContent>
        <TabContentHeader onClick={onActivate}>
          <CurrencySelector currencyCode={currencyCode} onChange={onChangeCurrency} />
        </TabContentHeader>
        <div className="l-2up-3up">
          {theme.indicators.map((indicator, index) => (
            <KeyFactIndicator
              key={index}
              location={location}
              indicator={indicator}
              currencyCode={currencyCode}
              useLocalValue={useLocalValue}
            />
          ))}
        </div>
      </TabContent>
    </TabContainer>
  );
};

export { KeyFactTab };
