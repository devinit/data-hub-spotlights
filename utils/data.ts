import gql from 'graphql-tag';
import fetch from 'isomorphic-unfetch';
import { PageScaffoldData } from '../components/DefaultLayout';

export interface SpotlightPage {
  title: string;
  full_url: string;
  relative_url: string;
  country_code: string;
  currency_code: string;
  themes: SpotlightTheme[];
}

export interface SpotlightTheme {
  name: string;
  slug: string;
  section: string | null;
  indicators: SpotlightIndicator[];
}

export type DataFormat = 'plain' | 'currency' | 'percent';

export interface SpotlightIndicator {
  ddw_id: string;
  name: string;
  description?: string;
  start_year?: number;
  end_year?: number;
  data_format: DataFormat;
  range?: string;
  value_prefix?: string;
  value_suffix?: string;
  tooltip_template?: string;
  content_template: string | null; // this is a JSON string in the format of SpotlightIndicatorContent
  colour?: string;
  source?: string;
}

export interface SpotlightIndicatorContent {
  stat?: {
    indicators: string[];
    startYear?: number;
    endYear?: number;
    dataFormat: DataFormat;
    valuePrefix?: string;
    valueSuffix?: string;
    valueTemplate?: string;
    title?: string;
    description?: string;
    source?: string;
    aggregation?: string; // this allows for simple operations on the data for more complex stats
    fetchAll?: boolean;
  };
  chart?: {
    type: 'bar' | 'line' | 'pie';
    indicators: {
      id: string;
      valuePrefix?: string;
      valueSuffix?: string;
      valueTemplate?: string;
      description?: string;
      source?: string;
    }[];
  };
}

export interface FetchIndicatorDataOptions {
  indicators: string[];
  geocodes?: string[];
  startYear?: number;
  endYear?: number;
  limit?: number;
  offset?: number;
}

export interface SpotlightLocation {
  geocode: string;
  name: string;
}

export interface LocationData extends SpotlightLocation {
  value: number;
  year: number;
  meta: string; // this is a JSON string - refer to LocationDataMeta to see structure
}

export interface LocationIndicatorData {
  indicator: string;
  data: LocationData[];
}

export type BudgetType = 'actual' | 'approved' | 'proposed';

export interface LocationDataMeta {
  budgetType?: BudgetType;
  valueLocalCurrency?: number;
}

export interface ProcessedData {
  value: number;
  meta?: LocationDataMeta;
}

export const fetchScaffoldData = async (): Promise<PageScaffoldData> => {
  const resNavigation = await fetch(`${process.env.CMS_URL}api/spotlights/navigation/`);
  const navigation = await resNavigation.json();
  const resFooter = await fetch(`${process.env.CMS_URL}api/footer/`);
  const footer = await resFooter.json();

  return { navigation, footer };
};

export const fetchSpotlightPage = async (slug: string): Promise<SpotlightPage> => {
  const response = await fetch(`${process.env.CMS_URL}api/spotlights/page/${slug}/`);
  const data = await response.json();

  return data;
};

export const GET_INDICATOR_DATA = gql`
  query GetIndicatorData(
    $indicators: [String]!
    $geocodes: [String] = []
    $startYear: Int = 0
    $endYear: Int = 9999
    $limit: Int = 100
    $page: Int = 0
  ) {
    data(
      indicators: $indicators
      geocodes: $geocodes
      startYear: $startYear
      endYear: $endYear
      limit: $limit
      page: $page
    ) {
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
