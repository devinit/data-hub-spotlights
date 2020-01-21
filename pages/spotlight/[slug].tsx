import { NextPage } from 'next';
import React, { useEffect } from 'react';
import { DefaultLayoutData } from '../../components/DefaultLayout';
import { PageScaffoldData, SpotlightPage, fetchScaffoldData, fetchSpotlightPage } from '../../utils';

interface SpotlightProps {
  setData?: (data: DefaultLayoutData) => void;
  scaffold: PageScaffoldData;
  page: SpotlightPage;
}

const Spotlight: NextPage<SpotlightProps> = ({ setData, scaffold }) => {
  useEffect(() => {
    if (setData) {
      setData({ ...scaffold });
    }
  }, [ setData, scaffold ]);

  return (
    <div>
      Spotlight Visualisations Go Here
    </div>
  );
};

Spotlight.getInitialProps = async (context) => {
  const { slug } = context.query;
  const scaffold = await fetchScaffoldData();
  const page = await fetchSpotlightPage(slug as string);

  return { scaffold, page };
};

export default Spotlight;
