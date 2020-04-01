import { useRouter } from 'next/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  createYearOptionsFromIndicator,
  getDefaultsByIndex,
  getDefaultsFromQuery,
  getOptionByIndexOrValue,
  getThemeDefaultsByIndex,
  parseIndicatorToOption,
  SpotlightOptions,
  THEME_QUERY
} from '../../utils';
import { FormField } from '../FormField';
import { Select, SelectOption } from '../Select';
import IndicatorFilterForm from './IndicatorFilterForm';
import { defaultSelectOptions, FilterSelectOptions, SpotlightFilterProps } from './utils';

const SpotlightFilters: FunctionComponent<SpotlightFilterProps> = ({ defaultIndexes, ...props }) => {
  const router = useRouter();
  const { options: defaultOptions, selected: defaultSelected } = router.query[THEME_QUERY]
    ? getDefaultsFromQuery(props.themes, router.query)
    : getDefaultsByIndex(props.themes, defaultIndexes);
  const [options, setOptions] = useState<FilterSelectOptions>(defaultOptions);
  const { themes, indicators, years } = options;
  const [selected, setSelected] = useState<SpotlightOptions>(defaultSelected);
  const { theme: activeTheme, indicator: activeIndicator, year: activeYear } = selected;

  useEffect(() => props.onOptionsChange(selected), [selected]);

  const onSelectTheme = (option?: SelectOption): void => {
    if (option) {
      const selectedTheme = props.themes.find(theme => theme.slug === option.value);
      if (selectedTheme) {
        const { options: themeOptions, selected: themeSelected } = getThemeDefaultsByIndex(selectedTheme, options);
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
      <FormField className={props.topicClassName}>
        <label className="form-label">{props.topicLabel}</label>
        <Select
          options={themes}
          onChange={onSelectTheme}
          placeholder="Select Topic"
          isLoading={!themes}
          defaultValue={
            themes
              ? getOptionByIndexOrValue(
                  themes,
                  defaultIndexes && defaultIndexes[0],
                  selected.theme && selected.theme.slug
                )
              : undefined
          }
        />
      </FormField>
      <IndicatorFilterForm
        indicators={indicators}
        activeIndicator={activeIndicator && parseIndicatorToOption(activeIndicator)}
        onSelectIndicator={onSelectIndicator}
        onSelectYear={onSelectYear}
        years={years}
        activeYear={activeYear}
        indicatorLabel={props.indicatorLabel}
        yearLabel={props.yearLabel}
        indicatorClassName={props.indicatorClassName}
        yearClassName={props.yearClassName}
      />
    </form>
  );
};

SpotlightFilters.defaultProps = {
  topicLabel: 'Select a topic to explore',
  indicatorLabel: 'Choose an indicator',
  yearLabel: 'Choose a year'
};

export { SpotlightFilters };
