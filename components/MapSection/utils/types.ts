import { SpotlightTheme, SpotlightLocation } from '../../../utils';

export interface MapSectionProps {
  countryCode: string;
  countryName: string;
  themes: SpotlightTheme[];
  onChangeLocation?: (location?: SpotlightLocation) => void;
}
