import { SpotlightTheme, SpotlightLocation } from '../../../utils';

export interface MapSectionProps {
  countryCode: string;
  themes: SpotlightTheme[];
  onChangeLocation?: (location?: SpotlightLocation) => void;
}
