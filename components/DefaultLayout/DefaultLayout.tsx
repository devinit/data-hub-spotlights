import { NextComponentType } from 'next';
import React, { ReactNode, cloneElement, isValidElement, useState } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
import { Footer } from '../Footer';
import Header from '../Header/Header';
import { PageScaffoldData } from './types';
import { Hero } from '../Hero';

const DefaultLayout: NextComponentType = ({ children }) => {
  const [ data, setData ] = useState<PageScaffoldData | undefined>();

  const attachDataProp = (component: ReactNode) => {
    if (isValidElement(component)) {
      return cloneElement(component, { setData });
    }

    return component;
  };

  return (
    <ErrorBoundary>
      <div className="ui-base">
        <Header navigation={ data && data.navigation }/>
        <main id="pagecontent" className="pagecontent -nofocus" role="main" tabIndex={ -1 }>
          <Hero title={ data && data.title ? data.title : '' }/>
          { attachDataProp(children) }
        </main>
        {
          data && data.footer
            ? <Footer { ...data.footer } primaryNavigation={ data.navigation.primary || [] }/>
            : null
        }
      </div>
    </ErrorBoundary>
  );
};

export { DefaultLayout as default, DefaultLayout };
