import { ApolloProvider } from '@apollo/client';
import { NextComponentType } from 'next';
import React, { cloneElement, isValidElement, ReactNode, useState } from 'react';
import { graphClient } from '../../utils';
import { ErrorBoundary } from '../ErrorBoundary';
import { Footer } from '../Footer';
import Header from '../Header/Header';
import { Hero, HeroAside } from '../Hero';
import { NavigationItem, SecondaryNavigation } from '../SecondaryNavigation';
import { PageScaffoldData } from './types';

const DefaultLayout: NextComponentType = ({ children }) => {
  const [data, setData] = useState<PageScaffoldData | undefined>();

  const attachDataProp = (component: ReactNode): ReactNode => {
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
            <Hero title={data && data.title ? data.title : ''}>
              <HeroAside>
                <SecondaryNavigation>
                  {data && location ? (
                    <>
                      <NavigationItem
                        title={data.title || 'Spotlight'}
                        url={location.pathname.replace('compare', '')}
                        active={!location.pathname.includes('compare')}
                      />
                      <NavigationItem
                        title="Location comparison"
                        url={`${location.pathname.replace('/compare', '').concat('/').replace('//', '/')}compare`}
                        active={location.pathname.includes('compare')}
                      />
                    </>
                  ) : null}
                </SecondaryNavigation>
              </HeroAside>
            </Hero>
            {attachDataProp(children)}
          </main>
          {data && data.footer ? <Footer {...data.footer} primaryNavigation={data.navigation.primary || []} /> : null}
          <style jsx global>{`
            .hide {
              display: none;
            }
          `}</style>
        </div>
      </ApolloProvider>
    </ErrorBoundary>
  );
};

export { DefaultLayout as default, DefaultLayout };
