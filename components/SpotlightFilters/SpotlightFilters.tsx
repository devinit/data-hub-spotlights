import { useRouter } from 'next/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  createYearOptionsFromIndicator,
  getDefaultsByIndex,
  getThemeDefaultsByIndex,
  INDICATOR_QUERY,
  parseIndicatorToOption,
  SpotlightOptions,
  THEME_QUERY,
  YEAR_QUERY,
  getDefaultsFromQuery,
  getOptionByIndexOrValue
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
        const href = router.route;
        const as = router.asPath + `?${THEME_QUERY}=${themeSelected.theme?.slug}`;
        if (router.asPath == `spotlight/${router.query.slug}`) {
          router.push(href, as, { shallow: true });
        } else {
          const asPath = router.asPath.split(/\?/)[0];
          const as = asPath + `?${THEME_QUERY}=${option.value}`;
          router.push(href, as, { shallow: true });
        }
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
      if (router.asPath.indexOf(`?${THEME_QUERY}=`) > 0) {
        const asPath = router.asPath.split(/\?/)[1];
        if (!asPath.includes(INDICATOR_QUERY)) {
          const as = router.asPath + `&${INDICATOR_QUERY}=${option.value}`;
          router.push(router.route, as, { shallow: true });
        } else {
          let urlParts = router.asPath.split('&');
          urlParts = urlParts.filter(e => !e.startsWith(INDICATOR_QUERY));
          const newUrl = urlParts.join('&');
          const as = newUrl + `&${INDICATOR_QUERY}=${option.value}`;
          router.push(router.route, as, { shallow: true });
        }
      } else {
        router.push(
          router.route,
          router.asPath + `?${THEME_QUERY}=${activeTheme.slug}` + `&${INDICATOR_QUERY}=${option.value}`,
          { shallow: true }
        );
      }
    } else if (activeIndicator) {
      setSelected({ ...selected, indicator: undefined, year: undefined });
      setOptions({ ...options, years: [] });
    }
  };

  const onSelectYear = (option?: SelectOption): void => {
    if (option && option.value) {
      setSelected({ ...selected, year: parseInt(option.value, 10) });
      if (router.asPath.indexOf(`?${THEME_QUERY}=`) > 0) {
        let urlParts = router.asPath.split('&');
        urlParts = urlParts.filter(e => !e.startsWith(YEAR_QUERY));
        const newUrl = urlParts.join('&');
        const as = newUrl + `&${YEAR_QUERY}=${option.value}`;
        router.push(router.route, as, { shallow: true });
      } else {
        router.push(
          router.route,
          router.asPath + `?${THEME_QUERY}=${activeTheme?.slug}` + `&${YEAR_QUERY}=${option.value}`,
          { shallow: true }
        );
      }
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
