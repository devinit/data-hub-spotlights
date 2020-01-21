import fetch from 'isomorphic-unfetch';
import { Footer, Navigation } from '../components/DefaultLayout';

export interface PageScaffoldData {
  navigation: Navigation;
  footer: Footer;
}

export interface SpotlightPage {
  title: string;
  full_url: string;
  relative_url: string;
  themes: SpotlightTheme[];
}

export interface SpotlightTheme {
  name: string;
  slug: string;
  indicators: SpotlightIndicator[];
}

export interface SpotlightIndicator {
  ddw_id: string;
  name: string;
  description?: string;
  start_year?: number;
  end_year?: number;
  range?: string;
  value_prefix?: string;
  value_suffix?: string;
  tooltip_template?: string;
  colour?: string;
  source?: string;
}

export const fetchScaffoldData = async (): Promise<PageScaffoldData> => {
  const res_navigation = await fetch(`${process.env.ASSETS_SOURCE_URL}api/spotlights/navigation/`);
  const navigation = await res_navigation.json();
  const res_footer = await fetch(`${process.env.ASSETS_SOURCE_URL}api/footer/`);
  const footer = await res_footer.json();

  return { navigation, footer };
};

export const fetchSpotlightPage = async (slug: string): Promise<SpotlightPage> => {
  const response = await fetch(`${process.env.ASSETS_SOURCE_URL}api/spotlights/page/${slug}/`);
  const data = await response.json();

  return data;
};
