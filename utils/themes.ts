import { SpotlightTheme } from '.';

export const THEME_QUERY = 'mt'; // map topic
export const INDICATOR_QUERY = 'mi'; // map indicator
export const YEAR_QUERY = 'my'; // map year

export const filterThemesBySection = (themes: SpotlightTheme[], section: string): SpotlightTheme[] =>
  themes.filter(theme => theme.section === section);
