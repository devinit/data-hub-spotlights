import { FilterDefaults, FilterSelectOptions } from './types';
import { SpotlightIndicator, SpotlightTheme } from '../../../utils';
import { SelectOption, SelectOptions } from '../../Select';
import { SpotlightOptions } from '../../MapSection';

export * from './types';
export const defaultSelectOptions: FilterSelectOptions = {
  themes: [],
  indicators: [],
  years: []
};

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

export const createYearOptionsFromIndicator = ({ start_year, end_year }: SpotlightIndicator): SelectOptions => {
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

export const parseIndicatorToOption = (indicator: SpotlightIndicator) => ({
  label: indicator.name,
  value: indicator.ddw_id
});

export const getThemeDefaults = (theme: SpotlightTheme, currentOptions: FilterSelectOptions): FilterDefaults => {
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

export const getDefaults = (themes: SpotlightTheme[]): FilterDefaults => {
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
