import React, { FunctionComponent, useEffect, useState } from 'react';
import { SpotlightIndicator, SpotlightTheme } from '../../utils';
import { SpotlightOptions } from '../MapSection';
import { Select, SelectOption, SelectOptions } from '../Select';
import IndicatorFilterForm from './IndicatorFilterForm';

interface SpotlightFilterProps {
  themes: SpotlightTheme[];
  onOptionsChange: (options: SpotlightOptions) => void;
}

export interface FilterSelectOptions {
  themes: SelectOptions;
  indicators: SelectOptions;
  years: SelectOptions;
}

interface FilterDefaults {
  options: FilterSelectOptions;
  selected: SpotlightOptions;
}

export const defaultSelectOptions: FilterSelectOptions = { themes: [], indicators: [], years: [] };

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

const getThemeDefaults = (theme: SpotlightTheme, currentOptions: FilterSelectOptions): FilterDefaults => {
  const options: FilterSelectOptions = { ...currentOptions };
  const selected: SpotlightOptions = { theme };
  options.indicators = createIndicatorOptionsFromTheme(theme);
  const defaultIndicator = theme.indicators[0];
  selected.indicator = defaultIndicator;
  if (defaultIndicator) {
    options.years = createYearOptionsFromIndicator(defaultIndicator);
    selected.year = options.years ? parseInt(options.years[0].value, 10) : undefined;
  }

  return { options, selected };
};

const getDefaults = (themes: SpotlightTheme[]): FilterDefaults => {
  const defaultOptions: FilterSelectOptions = {
    ...defaultSelectOptions,
    themes: createThemeOptions(themes)
  };
  const defaultTheme = themes[0];
  const defaultSelected: SpotlightOptions = { theme: defaultTheme };
  if (defaultTheme) {
    return getThemeDefaults(defaultTheme, defaultOptions);
  }

  return { options: defaultOptions, selected: defaultSelected };
};

const SpotlightFilters: FunctionComponent<SpotlightFilterProps> = props => {
  const { options: defaultOptions, selected: defaultSelected } = getDefaults(props.themes);
  const [ options, setOptions ] = useState<FilterSelectOptions>(defaultOptions);
  const { themes, indicators, years } = options;
  const [ selected, setSelected ] = useState<SpotlightOptions>(defaultSelected);
  const { theme: activeTheme, indicator: activeIndicator, year: activeYear } = selected;

  useEffect(() => props.onOptionsChange(selected), [ selected ]);

  const onSelectTheme = (option?: SelectOption) => {
    if (option) {
      const selectedTheme = props.themes.find(theme => theme.slug === option.value);
      if (selectedTheme) {
        const { options: themeOptions, selected: themeSelected } = getThemeDefaults(selectedTheme, options);
        setSelected(themeSelected);
        setOptions(themeOptions);
      }
    } else if (activeIndicator) {
      setSelected({});
      setOptions(defaultSelectOptions);
    }
  };

  const onSelectIndicator = (option?: SelectOption) => {
    if (option && activeTheme) {
      const selectedIndicator = activeTheme.indicators.find(indicator => indicator.ddw_id === option.value);
      setSelected({ ...selected, indicator: selectedIndicator, year: undefined });
      setOptions({
        ...options,
        years: selectedIndicator ? createYearOptionsFromIndicator(selectedIndicator) : undefined
      });
    } else if (activeIndicator) {
      setSelected({ ...selected, indicator: undefined, year: undefined });
      setOptions({ ...options, years: [] });
    }
  };

  const onSelectYear = (option?: SelectOption) => {
    if (option && option.value) {
      setSelected({ ...selected, year: parseInt(option.value, 10) });
    } else {
      setSelected({ ...selected, year: undefined });
    }
  };

  return (
    <>
      <label className="form-label">Theme</label>
      <Select
        options={ themes }
        onChange={ onSelectTheme }
        placeholder="Select Theme"
        isLoading={ !themes }
        defaultValue={ options.themes ? options.themes[0] : undefined }
      />
      <IndicatorFilterForm
        indicators={ indicators }
        activeIndicator={ activeIndicator && parseIndicatorToOption(activeIndicator) }
        onSelectIndicator={ onSelectIndicator }
        onSelectYear={ onSelectYear }
        years={ years }
        activeYear={ activeYear }
      />
    </>
  );
};

export { SpotlightFilters };
