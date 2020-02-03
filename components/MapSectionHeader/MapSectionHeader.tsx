import React, { FunctionComponent, useEffect, useState } from 'react';
import { SpotlightTheme } from '../../utils';
import { SpotlightOptions } from '../MapSection/MapSection';
import { Select, SelectOption, SelectOptions } from '../Select';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerForm, SpotlightBannerMain } from '../SpotlightBanner';

interface MapSectionHeaderProps {
  themes: SpotlightTheme[];
  onOptionsChange: (options: SpotlightOptions) => void;
}

interface SectionSelectOptions {
  themes: SelectOptions;
  indicators: SelectOptions;
  years: SelectOptions;
}

const defaultSelectOptions: SectionSelectOptions = { themes: [], indicators: [], years: [] };

const createThemeOptions = (themes: SpotlightTheme[]): SelectOptions =>
  themes.map(theme => ({
    label: theme.name,
    value: theme.slug
  }));

const createIndicatorOptionsFromTheme = (theme: SpotlightTheme): SelectOptions => {
  if (theme) {
    return theme.indicators.map(indicator => ({
      label: indicator.name,
      value: indicator.ddw_id
    }));
  }

  return [];
};

const MapSectionHeader: FunctionComponent<MapSectionHeaderProps> = props => {
  const [ options, setOptions ] = useState<SectionSelectOptions>(defaultSelectOptions);
  const { themes } = options;
  const [ selected, setSelected ] = useState<SpotlightOptions>({});

  useEffect(() => {
    setOptions({ ...options, themes: createThemeOptions(props.themes) });
  }, []);
  useEffect(() => props.onOptionsChange(selected), [ selected ]);

  const onSelectTheme = (option?: SelectOption) => {
    if (option) {
      const selectedTheme = props.themes.find(theme => theme.slug === option.value);
      setSelected({ theme: selectedTheme, indicator: undefined, year: undefined });
      setOptions({
        ...options,
        indicators: selectedTheme ? createIndicatorOptionsFromTheme(selectedTheme) : undefined,
        years: undefined
      });
    }
  };

  return (
    <SpotlightBanner>
      <SpotlightBannerAside>
        <label className="form-label">Select Location</label>
        <Select options={ themes } onChange={ onSelectTheme } placeholder="Select Theme"/>
      </SpotlightBannerAside>
      <SpotlightBannerMain>
        <SpotlightBannerForm/>
      </SpotlightBannerMain>
    </SpotlightBanner>
  );
};

export { MapSectionHeader };
