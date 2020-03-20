import { ParsedUrlQuery } from 'querystring';
import { SpotlightIndicator, SpotlightTheme } from '.';
import { SelectOption, SelectOptions } from '../components/Select';
import { defaultSelectOptions, FilterDefaults, FilterSelectOptions } from '../components/SpotlightFilters';
import { INDICATOR_QUERY, THEME_QUERY, YEAR_QUERY } from './themes';

export interface SpotlightOptions {
  theme?: SpotlightTheme;
  indicator?: SpotlightIndicator;
  year?: number;
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

// TODO: exclude specified years
export const createYearOptionsFromRange = (startYear = 0, endYear = 0, _exclude?: number[]): SelectOptions => {
  const options: SelectOption[] = [];
  if (startYear || endYear) {
    const difference = Math.abs(endYear - startYear);
    for (let i = 0; i <= difference; i++) {
      const year = startYear + i;
      options.push({ value: `${year}`, label: `${year}` });
    }
  }

  return options;
};

export const createYearOptionsFromIndicator = ({ start_year, end_year }: SpotlightIndicator): SelectOptions => {
  const startYear = start_year || end_year || 0;
  const endYear = end_year || start_year || 0;

  return createYearOptionsFromRange(startYear, endYear);
};

export const parseIndicatorToOption = (indicator: SpotlightIndicator): SelectOption => ({
  label: indicator.name,
  value: indicator.ddw_id
});

export const getThemeDefaultsByIndex = (
  theme: SpotlightTheme,
  currentOptions: FilterSelectOptions,
  defaultIndicatorIndex = 0
): FilterDefaults => {
  const options: FilterSelectOptions = { ...currentOptions };
  const selected: SpotlightOptions = { theme };
  options.indicators = createIndicatorOptionsFromTheme(theme);
  const defaultIndicator = theme.indicators[defaultIndicatorIndex];
  selected.indicator = defaultIndicator;
  if (defaultIndicator) {
    options.years = createYearOptionsFromIndicator(defaultIndicator);
    selected.year = options.years ? parseInt(options.years[0].value, 10) : undefined;
  }

  return { options, selected };
};

export const getThemeDefaultsBySlug = (
  theme: SpotlightTheme,
  currentOptions: FilterSelectOptions,
  indicatorDBId: string
): FilterDefaults => {
  const indicatorIndex = theme.indicators.findIndex(_indicator => _indicator.ddw_id === indicatorDBId);

  return getThemeDefaultsByIndex(theme, currentOptions, indicatorIndex !== -1 ? indicatorIndex : 0);
};

export const getDefaultsByIndex = (
  themes: SpotlightTheme[],
  defaultIndexes: [number, number] = [0, 0]
): FilterDefaults => {
  const defaultOptions: FilterSelectOptions = {
    ...defaultSelectOptions,
    themes: createThemeOptions(themes)
  };
  const defaultTheme = themes[defaultIndexes[0]];
  const defaultSelected: SpotlightOptions = { theme: defaultTheme };
  if (defaultTheme) {
    return getThemeDefaultsByIndex(defaultTheme, defaultOptions, defaultIndexes[1]);
  }

  return { options: defaultOptions, selected: defaultSelected };
};

export const getDefaultsFromQuery = (themes: SpotlightTheme[], query: ParsedUrlQuery): FilterDefaults => {
  const defaultOptions: FilterSelectOptions = {
    ...defaultSelectOptions,
    themes: createThemeOptions(themes)
  };
  const themeSlug = Array.isArray(query[THEME_QUERY]) ? query[THEME_QUERY][0] : (query[THEME_QUERY] as string);
  const defaultTheme = themes.find(theme => theme.slug === themeSlug);
  if (defaultTheme) {
    const indicatorSlug = Array.isArray(query[INDICATOR_QUERY])
      ? query[INDICATOR_QUERY][0]
      : (query[INDICATOR_QUERY] as string);

    const themeDefaults = getThemeDefaultsBySlug(defaultTheme, defaultOptions, indicatorSlug);
    const year = Array.isArray(query[YEAR_QUERY]) ? query[YEAR_QUERY][0] : (query[YEAR_QUERY] as string);
    themeDefaults.selected.year = year ? parseInt(year) : themeDefaults.selected.year;

    return themeDefaults;
  }

  return getDefaultsByIndex(themes);
};

export const getOptionByIndexOrValue = (
  options: SelectOptions,
  index = 0,
  value?: string
): SelectOption | undefined => {
  if (!options) {
    return undefined;
  }

  return value ? options.find(option => option.value === value) : options[index];
};
