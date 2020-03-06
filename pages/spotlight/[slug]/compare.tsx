import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { PageScaffoldData } from '../../../components/DefaultLayout';
import { LocationComparisonSection } from '../../../components/LocationComparisonSection';
import { fetchScaffoldData, fetchSpotlightPage, SpotlightPage } from '../../../utils';
import { PageSection } from '../../../components/PageSection';

interface CompareProps {
  setData?: (data: PageScaffoldData) => void;
  scaffold: PageScaffoldData;
  page: SpotlightPage;
}

const Compare: NextPage<CompareProps> = ({ setData, scaffold, page }) => {
  useEffect(() => {
    if (setData) {
      setData({ ...scaffold, title: page.title });
    }
  }, [setData, scaffold]);

  if (page.themes && page.country_code) {
    return (
      <>
        <LocationComparisonSection
          countryCode={page.country_code}
          countryName={page.country_name}
          themes={page.themes}
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

Compare.getInitialProps = async (context): Promise<CompareProps> => {
  const { slug } = context.query;
  const scaffold = await fetchScaffoldData();
  const page = await fetchSpotlightPage(slug as string);

  return { scaffold, page };
};

export default Compare;
