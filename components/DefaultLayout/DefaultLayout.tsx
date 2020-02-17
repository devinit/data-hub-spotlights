import { ApolloProvider } from '@apollo/react-hooks';
import { NextComponentType } from 'next';
import React, { ReactNode, cloneElement, isValidElement, useState } from 'react';
import { graphClient } from '../../utils';
import { ErrorBoundary } from '../ErrorBoundary';
import { Footer } from '../Footer';
import Header from '../Header/Header';
import { Hero } from '../Hero';
import { PageScaffoldData } from './types';

const DefaultLayout: NextComponentType = ({ children }) => {
  const [data, setData] = useState<PageScaffoldData | undefined>();

  const attachDataProp = (component: ReactNode) => {
    if (isValidElement(component)) {
      return cloneElement(component, { setData });
    }

    return component;
  };

  return (
    <ErrorBoundary>
      <ApolloProvider client={graphClient}>
        <div className="ui-base">
          <Header navigation={data && data.navigation} />
          <main id="pagecontent" className="pagecontent -nofocus" role="main" tabIndex={-1}>
            <Hero title={data && data.title ? data.title : ''} />
            {attachDataProp(children)}
          </main>
          {data && data.footer ? <Footer {...data.footer} primaryNavigation={data.navigation.primary || []} /> : null}
        </div>
      </ApolloProvider>
    </ErrorBoundary>
  );
};

export { DefaultLayout as default, DefaultLayout };
