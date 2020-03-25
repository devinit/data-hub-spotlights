import { SpotlightLocation } from '.';

export interface ValueOptions {
  useLocalValue?: boolean;
  dataFormat: 'plain' | 'currency' | 'percent';
  aggregation?: string;
  prefix?: string;
  suffix?: string;
  location?: SpotlightLocation;
}

export const DEFAULT_VALUE = 'No Data';

export const addPrefixAndSuffix = (value: string | number, options: ValueOptions): string => {
  return `${options.prefix || ''} ${value}${options.suffix || ''}`;
};
