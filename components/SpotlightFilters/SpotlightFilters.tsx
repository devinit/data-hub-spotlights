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

const SpotlightFilters: FunctionComponent<SpotlightFilterProps> = props => {
  const [ options, setOptions ] = useState<FilterSelectOptions>(defaultSelectOptions);
  const { themes, indicators, years } = options;
  const [ selected, setSelected ] = useState<SpotlightOptions>({});
  const { theme: activeTheme, indicator: activeIndicator, year: activeYear } = selected;

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
      <Select options={ themes } onChange={ onSelectTheme } placeholder="Select Theme"/>
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
