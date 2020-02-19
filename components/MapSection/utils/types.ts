import { SpotlightIndicator, SpotlightTheme, SpotlightLocation } from '../../../utils';

export interface MapSectionProps {
  countryCode: string;
  themes: SpotlightTheme[];
  onChangeLocation?: (location?: SpotlightLocation) => void;
}

export interface SpotlightOptions {
  theme?: SpotlightTheme;
  indicator?: SpotlightIndicator;
  year?: number;
}
