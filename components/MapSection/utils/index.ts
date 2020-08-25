import chroma, { scale } from 'chroma-js';
import { ParsedUrlQuery } from 'querystring';
import {
  INDICATOR_QUERY,
  LOCATION_CODE_QUERY,
  LOCATION_NAME_QUERY,
  SpotlightIndicator,
  SpotlightLocation,
  SpotlightOptions,
  THEME_QUERY,
  YEAR_QUERY,
} from '../../../utils';

export * from './types';

export const parseIndicator = (indicator: SpotlightIndicator): string | undefined => {
  const split = indicator.ddw_id.split('.');

  return split.length ? split[1] : split[0];
};
export const splitByComma = (text?: string): string[] => (text ? text.split(',') : []);
export const generateColours = (colours: string[], range: string[]): string[] => {
  if (colours.length > range.length) {
    return colours;
  }

  const baseColor = colours[0] || '#8f1b13'; // base colour taken from pattern library TODO: get one from comms thingie
  const lighter = chroma(baseColor).brighten(3);

  return scale([lighter, baseColor]).colors(range.length + 1);
};
export const getIndicatorColours = (indicator?: SpotlightIndicator, range?: string[]): string[] | undefined =>
  indicator && range ? generateColours(splitByComma(indicator.colour) || [], range) : undefined;

export const getDataPrefix = (options: SpotlightOptions): string | undefined =>
  options.indicator && `${options.indicator.name}: ${options.indicator.value_prefix || ''}`;
export const getDataSuffix = ({ indicator, year }: SpotlightOptions): string | undefined =>
  indicator ? (year ? `${indicator.value_suffix || ''} in ${year}` : indicator.value_suffix || '') : undefined;

export const setQuery = (options: SpotlightOptions, locations?: SpotlightLocation[]): void => {
  const { pathname } = window.location;
  const as = `${pathname}?${THEME_QUERY}=${options.theme?.slug}&${INDICATOR_QUERY}=${options.indicator?.ddw_id}&${YEAR_QUERY}=${options.year}`;
  if (locations && locations.length > 0) {
    const lc = locations.map((location) => location.geocode).join();
    const ln = locations.map((location) => location.name.toLowerCase()).join();
    window.history.pushState({}, '', `${as}&${LOCATION_CODE_QUERY}=${lc}&${LOCATION_NAME_QUERY}=${ln}`);
  } else {
    window.history.pushState({}, '', as);
  }
};

export const getDefaultLocationFromQuery = (query: ParsedUrlQuery): SpotlightLocation | undefined => {
  const name = query[LOCATION_NAME_QUERY];
  const code = query[LOCATION_CODE_QUERY];
  if (name && code) {
    return { name: Array.isArray(name) ? name[0] : name, geocode: Array.isArray(code) ? code[0] : code };
  }
};
