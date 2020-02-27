import { SpotlightTheme, SpotlightOptions } from '../../../utils';
import { SelectOptions } from '../../Select';

export interface SpotlightFilterProps {
  themes: SpotlightTheme[];
  onOptionsChange: (options: SpotlightOptions) => void;
}

export interface FilterSelectOptions {
  themes: SelectOptions;
  indicators: SelectOptions;
  years: SelectOptions;
}

export interface FilterDefaults {
  options: FilterSelectOptions;
  selected: SpotlightOptions;
}
