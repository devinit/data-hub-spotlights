import { SpotlightTheme } from '.';

export const LOCATION_QUERY = 'l';
export const THEME_QUERY = 't'; // topic
export const INDICATOR_QUERY = 'i'; // indicator
export const YEAR_QUERY = 'y'; // year

export const filterThemesBySection = (themes: SpotlightTheme[], section: string): SpotlightTheme[] =>
  themes.filter(theme => theme.section === section);
