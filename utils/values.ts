import { SpotlightLocation } from '.';

export interface ValueOptions {
  useLocalValue?: boolean;
  dataFormat: 'plain' | 'currency' | 'percent';
  aggregation?: string;
  prefix?: string;
  suffix?: string;
  location?: SpotlightLocation;
  decimalCount?: number;
}

export const DEFAULT_VALUE = 'No Data';

export const addPrefixAndSuffix = (value: string | number, options: ValueOptions): string => {
  if (options.suffix === 'th') {
    if (value === 1 || value === '1') {
      return `${options.prefix || ''} ${value}st`;
    }
    if (`${value}`.endsWith('2')) {
      return `${options.prefix || ''} ${value}nd`;
    }
    if (`${value}`.endsWith('3')) {
      return `${options.prefix || ''} ${value}rd`;
    }
  }

  return `${options.prefix || ''} ${value}${options.suffix || ''}`;
};
