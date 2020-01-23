import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { PageScaffoldData } from '../../components/DefaultLayout';
import { PageSection } from '../../components/PageSection';
import { SpotlightPage, fetchScaffoldData, fetchSpotlightPage } from '../../utils';

interface SpotlightProps {
  setData?: (data: PageScaffoldData) => void;
  scaffold: PageScaffoldData;
  page: SpotlightPage;
}

const Spotlight: NextPage<SpotlightProps> = ({ setData, scaffold, page }) => {
  useEffect(() => {
    if (setData) {
      setData({ ...scaffold, title: page.title });
    }
  }, [ setData, scaffold ]);

  return (
    <>
      <PageSection>Spotlight Visualisations Go Here</PageSection>
    </>
  );
};

Spotlight.getInitialProps = async (context) => {
  const { slug } = context.query;
  const scaffold = await fetchScaffoldData();
  const page = await fetchSpotlightPage(slug as string);

  return { scaffold, page };
};

export default Spotlight;
