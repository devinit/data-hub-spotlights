import { EChartOption } from 'echarts';
import gql from 'graphql-tag';
import fetch from 'isomorphic-unfetch';
import { PageScaffoldData } from '../components/DefaultLayout';
import { DataSourcesLink } from '../components/DataSourcesSection';

export interface SpotlightPage {
  title: string;
  full_url: string;
  relative_url: string;
  country_code: string;
  country_name: string;
  currency_code: string;
  datasources_description: string;
  datasource_links: DataSourcesLink[];
  themes: SpotlightTheme[];
  compare: SpotlightCompareConfigs;
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
  slug: string;
  description?: string;
  start_year?: number;
  end_year?: number;
  excluded_years?: string;
  data_format: DataFormat;
  range?: string;
  value_prefix?: string;
  value_suffix?: string;
  tooltip_template?: string;
  content_template: string | null; // this is a JSON string in the format of SpotlightIndicatorContent
  colour?: string;
  source?: string;
}

export interface SpotlightCompareConfigs {
  default_locations: SpotlightLocation[];
}

export interface ContentMeta {
  description?: string;
  source?: string;
}

export interface ContentNote {
  content?: string;
  meta?: ContentMeta;
}

export type Aggregation = 'SUM' | 'AVG' | 'PERCENT' | 'POSN ASC' | 'POSN DESC';

interface SharedIndicatorContentProps {
  indicators: string[];
  startYear?: number;
  endYear?: number;
  title?: string;
  meta?: ContentMeta;
  fetchAll?: boolean;
  aggregation?: Aggregation; // this allows for simple operations on the data for more complex stats
}

export interface DataFilter {
  field: string;
  operator: string;
  value: string;
}

export interface IndicatorStat extends SharedIndicatorContentProps {
  dataFormat: DataFormat;
  valuePrefix?: string;
  valueSuffix?: string;
  valueTemplate?: string;
  note?: ContentNote;
  filter?: DataFilter[][];
  decimalCount?: number;
}

export interface IndicatorChart extends SharedIndicatorContentProps {
  type: 'bar' | 'pie';
  options: EChartOption<EChartOption.SeriesBar | EChartOption.SeriesLine>;
  bar?: BarLineOptions;
  line?: BarLineOptions;
  pie?: {
    legend: string;
    value: string;
    name: string;
  };
}

export interface BarLineOptions {
  legend: string;
  xAxis: string;
  yAxis: string[];
}

export interface SpotlightIndicatorContent {
  stat?: IndicatorStat;
  chart?: IndicatorChart;
  revenue?: RevenueExpenditureConfig;
  expenditure?: RevenueExpenditureConfig;
}

export interface RevenueExpenditureConfig {
  root: string; // the name/slug of the root level
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

export interface LocationDataMeta extends Object {
  budgetType?: BudgetType;
  valueLocalCurrency?: number;
  extra?: { [key: string]: number | string };
}

export interface ProcessedData {
  value: number;
  name: string;
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

export const extraValueFromMeta = (meta: string, field: string, defaultValue = ''): string | number => {
  try {
    const _meta: LocationDataMeta = JSON.parse(meta);

    if (_meta.hasOwnProperty(field)) {
      return (_meta as any)[field];
    }
    if (_meta.extra) {
      return _meta.extra[field];
    }

    return defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const hasData = (data: LocationIndicatorData[]): boolean =>
  !!data.reduce((prev, curr) => prev + curr.data.length, 0);

export const GET_INDICATOR_DATA = gql`
  query GetIndicatorData(
    $indicators: [String]!
    $geocodes: [String] = []
    $startYear: Int = 0
    $endYear: Int = 9999
    $limit: Int = 100
    $page: Int = 0
    $filter: [[Filter]] = []
  ) {
    data(
      indicators: $indicators
      geocodes: $geocodes
      startYear: $startYear
      endYear: $endYear
      filter: $filter
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
