import gql from 'graphql-tag';
import fetch from 'isomorphic-unfetch';
import { PageScaffoldData } from '../components/DefaultLayout';

export interface SpotlightPage {
  title: string;
  full_url: string;
  relative_url: string;
  country_code: string;
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

export interface FetchIndicatorDataOptions {
  indicators: string[];
  geocodes?: string[];
  startYear?: number;
  endYear?: number;
  limit?: number;
  offset?: number;
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

export const GET_INDICATOR_DATA = gql`
  query GetIndicatorData($indicators: [String]!, $geocodes: [String] = [], $startYear: Int = 0, $endYear: Int = 9999, $limit: Int = 100, $page: Int = 0) {
    data(indicators:$indicators, geocodes:$geocodes, startYear:$startYear, endYear:$endYear, limit:$limit, page:$page) {
      indicator
      data {
        geocode
        name
        value
        year
        meta
      }
    }
  }
`;
