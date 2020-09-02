import { NextPage } from 'next';
import Head from 'next/head';
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
  BoundaryDepthContext,
  CountryContext,
  fetchScaffoldData,
  fetchSpotlightPage,
  filterThemesBySection,
  getSlugFromURL,
  LocationContext,
  SpotlightLocation,
  SpotlightPage,
} from '../../../utils';

interface SpotlightProps {
  setData?: (data: PageScaffoldData) => void;
  scaffold: PageScaffoldData;
  page: SpotlightPage;
}

const Spotlight: NextPage<SpotlightProps> = ({ setData, scaffold, page }) => {
  const { country_code: countryCode, country_name: countryName, currency_code: currencyCode } = page;
  const [countryInfo] = useState({ countryCode, countryName, currencyCode });
  const [location, setLocation] = useState<SpotlightLocation | undefined>();
  useEffect(() => {
    if (setData) {
      setData({ ...scaffold, title: page.title, slug: getSlugFromURL(page.relative_url) });
    }
  }, [setData, scaffold]);
  const onChangeLocation = (location?: SpotlightLocation): void => setLocation(location);
  const mapThemes = filterThemesBySection(page.themes, 'map');

  if (page.themes && page.country_code) {
    return (
      <LocationContext.Provider value={location}>
        <CountryContext.Provider value={countryInfo}>
          <BoundaryDepthContext.Provider value="d">
            <Head>
              <title>{page.title}</title>
            </Head>
            <MapSection themes={mapThemes} onChangeLocation={onChangeLocation} />
            <KeyFactsSection themes={filterThemesBySection(page.themes, location ? 'facts' : 'country-facts')} />
            <IndicatorComparisonSection themes={mapThemes} />
            {filterThemesBySection(page.themes, 'revenue-expenditure').map((theme) =>
              theme.indicators
                .filter((indicator) =>
                  !location ? indicator.slug.includes('country') : !indicator.slug.includes('country')
                )
                .map((indicator, index) => (
                  <ErrorBoundary key={index}>
                    <RevenueExpenditureSection indicator={indicator} />
                  </ErrorBoundary>
                ))
            )}
            <DataSourcesSection description={page.datasources_description} dataSourceLinks={page.datasource_links} />
          </BoundaryDepthContext.Provider>
        </CountryContext.Provider>
      </LocationContext.Provider>
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

  return { scaffold, page };
};

export default Spotlight;
