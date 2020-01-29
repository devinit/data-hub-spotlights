import React, { FunctionComponent, useEffect, useState } from 'react';
import { SpotlightIndicator, SpotlightTheme } from '../../utils';
import { Select, SelectOption, SelectOptions } from '../Select';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerForm, SpotlightBannerMain } from '../SpotlightBanner';
import MapSectionHeaderForm from './MapSectionHeaderForm';
import { SpotlightOptions } from '../MapSection/MapSection';

interface MapSectionHeaderProps {
  themes: SpotlightTheme[];
  onOptionsChange: (options: SpotlightOptions) => void;
}

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

const createYearOptionsFromIndicator = ({ start_year, end_year }: SpotlightIndicator): SelectOptions => {
  const options: SelectOption[] = [];
  const startYear = start_year || end_year || 0;
  const endYear = end_year || start_year || 0;
  if (startYear || endYear) {
    const difference = Math.abs(endYear - startYear);
    for (let i = 0; i <= difference; i++) {
      const year = startYear + i;
      options.push({ value: `${year}`, label: `${year}` });
    }
  }

  return options;
};

const parseIndicatorToOption = (indicator: SpotlightIndicator) =>
  ({ label: indicator.name, value: indicator.ddw_id });

const MapSectionHeader: FunctionComponent<MapSectionHeaderProps> = props => {
  const [ themes, setThemes ] = useState<SelectOptions>([]);
  const [ activeTheme, setActiveTheme ] = useState<SpotlightTheme | undefined>(undefined);
  const [ indicators, setIndicators ] = useState<SelectOptions>([]);
  const [ activeIndicator, setActiveIndicator ] = useState<SpotlightIndicator | undefined>(undefined);
  const [ years, setYears ] = useState<SelectOptions>([]);
  const [ activeYear, setActiveYear ] = useState<number | undefined>(undefined);

  useEffect(() => setThemes(createThemeOptions(props.themes)), []);
  useEffect(() => props.onOptionsChange({ indicator: activeIndicator, year: activeYear }),
    [ activeIndicator, activeYear ]);

  const clearYears = () => {
    setYears(undefined);
    setActiveYear(undefined);
  };

  const onSelectTheme = (option?: SelectOption) => {
    if (option) {
      const selectedTheme = props.themes.find(theme => theme.slug === option.value);
      setActiveTheme(selectedTheme);
      if (selectedTheme) {
        setIndicators(createIndicatorOptionsFromTheme(selectedTheme));
        setActiveIndicator(undefined);
        clearYears();
      }
    } else if (activeIndicator) {
      setIndicators(undefined);
      setActiveIndicator(undefined);
      clearYears();
    }
  };

  const onSelectIndicator = (option?: SelectOption) => {
    if (option && activeTheme) {
      const selectedIndicator = activeTheme.indicators.find(indicator => indicator.ddw_id === option.value);
      setActiveIndicator(selectedIndicator);
      if (selectedIndicator) {
        setYears(createYearOptionsFromIndicator(selectedIndicator));
        setActiveYear(undefined);
      }
    } else if (activeIndicator) {
      setActiveIndicator(undefined);
      clearYears();
    }
  };

  const onSelectYear = (option?: SelectOption) => {
    if (option && option.value) {
      setActiveYear(parseInt(option.value, 10));
    } else {
      setActiveYear(undefined);
    }
  };

  return (
    <SpotlightBanner>
      <SpotlightBannerAside>
        <label className="form-label">Theme</label>
        <Select options={ themes } onChange={ onSelectTheme } placeholder="Select Theme"/>
      </SpotlightBannerAside>
      <SpotlightBannerMain>
        <SpotlightBannerForm>
          <MapSectionHeaderForm
            indicators={ indicators }
            activeIndicator={ activeIndicator && parseIndicatorToOption(activeIndicator) }
            onSelectIndicator={ onSelectIndicator }
            onSelectYear={ onSelectYear }
            years={ years }
            activeYear={ activeYear }
          />
        </SpotlightBannerForm>
      </SpotlightBannerMain>
    </SpotlightBanner>
  );
};

export { MapSectionHeader };
