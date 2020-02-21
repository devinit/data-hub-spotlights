import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { PageScaffoldData } from '../../components/DefaultLayout';
import { MapSection } from '../../components/MapSection';
import { SpotlightPage, fetchScaffoldData, fetchSpotlightPage, SpotlightLocation } from '../../utils';
import { PageSection } from '../../components/PageSection';
import { KeyFactsSection } from '../../components/KeyFactsSection';

interface SpotlightProps {
  setData?: (data: PageScaffoldData) => void;
  scaffold: PageScaffoldData;
  page: Partial<SpotlightPage>;
}

const Spotlight: NextPage<SpotlightProps> = ({ setData, scaffold, page }) => {
  const [location, setLocation] = useState<SpotlightLocation | undefined>();
  useEffect(() => {
    if (setData) {
      setData({ ...scaffold, title: page.title });
    }
  }, [setData, scaffold]);
  const onChangeLocation = (location?: SpotlightLocation): void => setLocation(location);

  if (page.themes && page.country_code) {
    return (
      <>
        <MapSection
          themes={page.themes.filter(theme => theme.section === 'map')}
          countryCode={page.country_code}
          onChangeLocation={onChangeLocation}
        />
        <KeyFactsSection
          currencyCode={page.currency_code || ''}
          location={location}
          themes={page.themes.filter(theme => theme.section === 'facts')}
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
