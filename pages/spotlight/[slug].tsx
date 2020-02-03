import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { PageScaffoldData } from '../../components/DefaultLayout';
import { MapSection } from '../../components/MapSection';
import { SpotlightPage, fetchScaffoldData, fetchSpotlightPage } from '../../utils';
import { PageSection } from '../../components/PageSection';

interface SpotlightProps {
  setData?: (data: PageScaffoldData) => void;
  scaffold: PageScaffoldData;
  page: Partial<SpotlightPage>;
}

const Spotlight: NextPage<SpotlightProps> = ({ setData, scaffold, page }) => {
  useEffect(() => {
    if (setData) {
      setData({ ...scaffold, title: page.title });
    }
  }, [ setData, scaffold ]);

  if (page.themes && page.country_code) {
    return (
      <>
        <MapSection themes={ page.themes } countryCode={ page.country_code }/>
      </>
    );
  }

  return <PageSection><h3>No Content</h3></PageSection>;
};

Spotlight.getInitialProps = async (context) => {
  const { slug } = context.query;
  const scaffold = await fetchScaffoldData();
  const page = await fetchSpotlightPage(slug as string);

  return { scaffold, page };
};

export default Spotlight;
