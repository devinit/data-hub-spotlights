import chroma, { scale } from 'chroma-js';
import { NextRouter } from 'next/router';
import { INDICATOR_QUERY, SpotlightIndicator, SpotlightOptions, THEME_QUERY, YEAR_QUERY } from '../../../utils';

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
  indicator ? (year ? `${indicator.value_suffix} in ${year}` : indicator.value_suffix || '') : undefined;

export const setQuery = (router: NextRouter, options: SpotlightOptions): void => {
  const { route, push } = router;
  const { pathname } = window.location;
  const as = `${pathname}?${THEME_QUERY}=${options.theme?.slug}&${INDICATOR_QUERY}=${options.indicator?.ddw_id}&${YEAR_QUERY}=${options.year}`;
  push(route, as, { shallow: true });
};
