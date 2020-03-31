import { FilterSelectOptions } from './types';
import { NextRouter } from 'next/router';
import { SpotlightOptions, THEME_QUERY, INDICATOR_QUERY, YEAR_QUERY } from '../../../utils';

export * from './types';
export const defaultSelectOptions: FilterSelectOptions = {
  themes: [],
  indicators: [],
  years: []
};

export const setQuery = ({ route, push }: NextRouter, options: SpotlightOptions): void => {
  const { pathname } = window.location;
  const as = `${pathname}?${THEME_QUERY}=${options.theme?.slug}&${INDICATOR_QUERY}=${options.indicator?.ddw_id}&${YEAR_QUERY}=${options.year}`;
  push(route, as, { shallow: true });
};
