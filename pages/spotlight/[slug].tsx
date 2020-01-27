import { useQuery } from '@apollo/react-hooks';
import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { PageScaffoldData } from '../../components/DefaultLayout';
import { MapSection } from '../../components/MapSection';
import { GET_INDICATOR_DATA, SpotlightPage, fetchScaffoldData, fetchSpotlightPage } from '../../utils';
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
  const { data, loading, error } = useQuery(GET_INDICATOR_DATA, {
    variables: {
      indicators: [ 'uganda_poverty_headcount' ],
      geocodes: [ 'UG.d102' ]
    } });
  console.log(loading, data, error && error.message, page);

  if (page.themes) {
    return (
      <>
        <MapSection themes={ page.themes }/>
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
