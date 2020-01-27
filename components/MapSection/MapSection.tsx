import React, { FunctionComponent } from 'react';
import { PageSection } from '../PageSection';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerMain } from '../SpotlightBanner';
import { SpotlightTheme } from '../../utils';
import { Select } from '../Select';
import { FormField } from '../FormField';
// import { GroupedOptionsType } from 'react-select';

interface MapSectionProps {
  themes: SpotlightTheme[];
}

const createThemeOptions = (themes: SpotlightTheme[]) =>
  themes.map(theme => ({
    label: theme.name,
    value: theme.slug
  }));

const MapSection: FunctionComponent<MapSectionProps> = ({ themes }) => {
  return (
    <PageSection>
      <SpotlightBanner>
        <SpotlightBannerAside>
          <label className="form-label">Theme</label>
          <Select options={ createThemeOptions(themes) }/>
        </SpotlightBannerAside>
        <SpotlightBannerMain>
          <FormField>
            <label className="form-label">Indicator</label>
            <Select isDisabled/>
          </FormField>
          <FormField>
            <label className="form-label">Year</label>
            <Select isDisabled/>
          </FormField>
          <FormField><button type="button" className="button">Update</button></FormField>
        </SpotlightBannerMain>
      </SpotlightBanner>
    </PageSection>
  );
};

export { MapSection };
