import { SpotlightTheme } from '.';

export const THEME_QUERY = 'mapTopic';
export const INDICATOR_QUERY = 'mapIndicator';
export const YEAR_QUERY = 'mapYear';

export const filterThemesBySection = (themes: SpotlightTheme[], section: string): SpotlightTheme[] =>
  themes.filter(theme => theme.section === section);
