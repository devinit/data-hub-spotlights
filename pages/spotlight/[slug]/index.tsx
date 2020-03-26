import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { DataSourcesSection } from '../../../components/DataSourcesSection';
import { PageScaffoldData } from '../../../components/DefaultLayout';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { IndicatorComparisonSection } from '../../../components/IndicatorComparisonSection';
import { KeyFactsSection } from '../../../components/KeyFactsSection';
import { MapSection } from '../../../components/MapSection';
import { PageSection } from '../../../components/PageSection';
import { RevenueExpenditureSection } from '../../../components/RevenueExpenditureSection';
import {
  fetchScaffoldData,
  fetchSpotlightPage,
  filterThemesBySection,
  SpotlightLocation,
  SpotlightPage
} from '../../../utils';

interface SpotlightProps {
  setData?: (data: PageScaffoldData) => void;
  scaffold: PageScaffoldData;
  page: SpotlightPage;
  currentUrl?: string;
}

const Spotlight: NextPage<SpotlightProps> = ({ setData, scaffold, page, currentUrl }) => {
  const [location, setLocation] = useState<SpotlightLocation | undefined>();
  useEffect(() => {
    if (setData) {
      setData({ ...scaffold, title: page.title });
    }
  }, [setData, scaffold]);
  const onChangeLocation = (location?: SpotlightLocation): void => setLocation(location);
  const mapThemes = filterThemesBySection(page.themes, 'map');

  if (page.themes && page.country_code) {
    return (
      <>
        <MapSection
          themes={mapThemes}
          countryCode={page.country_code}
          countryName={page.country_name}
          onChangeLocation={onChangeLocation}
          url={currentUrl}
        />
        <KeyFactsSection
          countryCode={page.country_code}
          countryName={page.country_name}
          currencyCode={page.currency_code || ''}
          location={location}
          themes={filterThemesBySection(page.themes, location ? 'facts' : 'country-facts')}
        />
        <IndicatorComparisonSection
          location={location}
          themes={mapThemes}
          countryCode={page.country_code}
          countryName={page.country_name}
        />
        {filterThemesBySection(page.themes, 'revenue-expenditure').map(theme =>
          theme.indicators
            .filter(indicator => (!location ? indicator.slug.includes('country') : !indicator.slug.includes('country')))
            .map((indicator, index) => (
              <ErrorBoundary key={index}>
                <RevenueExpenditureSection
                  indicator={indicator}
                  countryCode={page.country_code}
                  countryName={page.country_name}
                  currencyCode={page.currency_code || ''}
                  location={location}
                />
              </ErrorBoundary>
            ))
        )}
        <DataSourcesSection description={page.datasources_description} dataSourceLinks={page.datasource_links} />
      </>
    );
  }

  return (
    <PageSection>
      <h3>No Content</h3>
    </PageSection>
  );
};

Spotlight.getInitialProps = async (context): Promise<SpotlightProps> => {
  const { slug } = context.query;
  const scaffold = await fetchScaffoldData();
  const page = await fetchSpotlightPage(slug as string);
  const host = context.req
    ? context.req.headers['x-forwarded-host'] || context.req.headers['host']
    : window.location.host;
  const query = context.asPath;
  let currentUrl = '';
  if (host) {
    currentUrl = host.indexOf('localhost') > -1 ? 'http://' + host + query : 'https://' + host + query;
  }

  return { scaffold, page, currentUrl };
};

export default Spotlight;
