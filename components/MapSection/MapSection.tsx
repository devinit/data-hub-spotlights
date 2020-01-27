import React, { FunctionComponent, useState } from 'react';
import { PageSection } from '../PageSection';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerMain } from '../SpotlightBanner';
import { SpotlightTheme } from '../../utils';
import { Select, SelectOptions } from '../Select';
import { FormField } from '../FormField';

interface MapSectionProps {
  themes: SpotlightTheme[];
}

const createThemeOptions = (themes: SpotlightTheme[]): SelectOptions =>
  themes.map(theme => ({
    label: theme.name,
    value: theme.slug
  }));

const createIndicatorOptionsFromTheme = (themeSlug: string, themes: SpotlightTheme[]): SelectOptions => {
  const selectedTheme = themes.find(theme => theme.slug === themeSlug);
  if (selectedTheme) {
    return selectedTheme.indicators.map(indicator => ({
      label: indicator.name,
      value: indicator.ddw_id
    }));
  }

  return [];
};

const MapSection: FunctionComponent<MapSectionProps> = ({ themes: themeData }) => {
  const [ themes ] = useState(createThemeOptions(themeData));
  const [ indicators, setIndicators ] = useState<SelectOptions>([]);

  const onSelectTheme = (option?: { label: string; value: string }) => {
    if (option) {
      setIndicators(createIndicatorOptionsFromTheme(option.value, themeData));
    } else {
      setIndicators(undefined);
    }
  };

  return (
    <PageSection>
      <SpotlightBanner>
        <SpotlightBannerAside>
          <label className="form-label">Theme</label>
          <Select options={ themes } onChange={ onSelectTheme }/>
        </SpotlightBannerAside>
        <SpotlightBannerMain>
          <FormField>
            <label className="form-label">Indicator</label>
            <Select isDisabled={ !indicators || !indicators.length } options={ indicators }/>
          </FormField>
          <FormField>
            <label className="form-label">Year</label>
            <Select isDisabled={ !indicators || !indicators.length }/>
          </FormField>
          <FormField><button type="button" className="button">Update</button></FormField>
        </SpotlightBannerMain>
      </SpotlightBanner>
    </PageSection>
  );
};

export { MapSection };
