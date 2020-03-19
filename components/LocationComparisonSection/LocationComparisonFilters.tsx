import React, { FunctionComponent, useState } from 'react';
import { FormField } from '../FormField';
import { Select, SelectOption } from '../Select';
import { FilterSelectOptions, SpotlightFilterProps, defaultSelectOptions } from '../SpotlightFilters/utils';
import {
  getDefaults,
  getThemeDefaults,
  createYearOptionsFromIndicator,
  parseIndicatorToOption,
  SpotlightOptions
} from '../../utils';
import { Button } from '../Button';

const LocationComparisonFilters: FunctionComponent<SpotlightFilterProps> = props => {
  const { options: defaultOptions, selected: defaultSelected } = getDefaults(props.themes);
  const [options, setOptions] = useState<FilterSelectOptions>(defaultOptions);
  const { themes, indicators } = options;
  const [selected, setSelected] = useState<SpotlightOptions>(defaultSelected);
  const { theme: activeTheme, indicator: activeIndicator } = selected;
  const activeIndicatorCache = activeIndicator && parseIndicatorToOption(activeIndicator);

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

  const onUpdateBtnClick = (): void => {
    props.onOptionsChange(selected);
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
          defaultValue={options.themes ? options.themes[0] : undefined}
        />
      </FormField>
      <FormField className={props.topicClassName}>
        <label className="form-label">{props.indicatorLabel}</label>
        <Select
          isDisabled={!indicators || !indicators.length}
          options={indicators}
          value={activeIndicatorCache || (indicators ? indicators[0] : null)}
          onChange={onSelectIndicator}
          placeholder="Select Indicator"
        />
      </FormField>
      <FormField className={props.topicClassName}>
        <Button className={'button'} onClick={onUpdateBtnClick}>
          Update
        </Button>
      </FormField>
    </form>
  );
};

LocationComparisonFilters.defaultProps = {
  topicLabel: 'Select a topic to explore',
  indicatorLabel: 'Choose an indicator'
};

export { LocationComparisonFilters };
