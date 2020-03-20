import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { PageScaffoldData } from '../../../components/DefaultLayout';
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
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { LocationComparisonSection } from '../../../components/LocationComparisonSection';

interface SpotlightProps {
  setData?: (data: PageScaffoldData) => void;
  scaffold: PageScaffoldData;
  page: SpotlightPage;
}

const Spotlight: NextPage<SpotlightProps> = ({ setData, scaffold, page }) => {
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

        <LocationComparisonSection
          themes={page.themes}
          countryCode={page.country_code}
          countryName={page.country_name}
        />
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

  return { scaffold, page };
};

export default Spotlight;
