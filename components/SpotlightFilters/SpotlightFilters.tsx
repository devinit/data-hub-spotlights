import React, { FunctionComponent, useEffect, useState } from 'react';
import { FormField } from '../FormField';
import { Select, SelectOption } from '../Select';
import IndicatorFilterForm from './IndicatorFilterForm';
import { FilterSelectOptions, SpotlightFilterProps, defaultSelectOptions } from './utils';
import {
  getDefaults,
  getThemeDefaults,
  createYearOptionsFromIndicator,
  parseIndicatorToOption,
  SpotlightOptions
} from '../../utils';

const SpotlightFilters: FunctionComponent<SpotlightFilterProps> = props => {
  const { options: defaultOptions, selected: defaultSelected } = getDefaults(props.themes);
  const [options, setOptions] = useState<FilterSelectOptions>(defaultOptions);
  const { themes, indicators, years } = options;
  const [selected, setSelected] = useState<SpotlightOptions>(defaultSelected);
  const { theme: activeTheme, indicator: activeIndicator, year: activeYear } = selected;

  useEffect(() => props.onOptionsChange(selected), [selected]);

  const onSelectTheme = (option?: SelectOption): void => {
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

  const onSelectIndicator = (option?: SelectOption): void => {
    if (option && activeTheme) {
      const selectedIndicator = activeTheme.indicators.find(indicator => indicator.ddw_id === option.value);
      const yearOptions = selectedIndicator ? createYearOptionsFromIndicator(selectedIndicator) : undefined;
      setSelected({
        ...selected,
        indicator: selectedIndicator,
        year: yearOptions && parseInt(yearOptions[0].value, 10)
      });
      setOptions({ ...options, years: yearOptions });
    } else if (activeIndicator) {
      setSelected({ ...selected, indicator: undefined, year: undefined });
      setOptions({ ...options, years: [] });
    }
  };

  const onSelectYear = (option?: SelectOption): void => {
    if (option && option.value) {
      setSelected({ ...selected, year: parseInt(option.value, 10) });
    } else {
      setSelected({ ...selected, year: undefined });
    }
  };

  return (
    <form className="form">
      <FormField className="">
        <label className="form-label">Select a topic to explore</label>
        <Select
          options={themes}
          onChange={onSelectTheme}
          placeholder="Select Theme"
          isLoading={!themes}
          defaultValue={options.themes ? options.themes[0] : undefined}
        />
      </FormField>
      <IndicatorFilterForm
        indicators={indicators}
        activeIndicator={activeIndicator && parseIndicatorToOption(activeIndicator)}
        onSelectIndicator={onSelectIndicator}
        onSelectYear={onSelectYear}
        years={years}
        activeYear={activeYear}
      />
    </form>
  );
};

export { SpotlightFilters };
