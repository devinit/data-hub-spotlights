import React, { Children, FunctionComponent, isValidElement } from 'react';
import { SpotlightBannerAside } from './SpotlightBannerAside';
import { SpotlightBannerMain } from './SpotlightBannerMain';

const SpotlightBanner: FunctionComponent = ({ children }) => {
  const renderValidChildren = () => {
    return Children.map(children, child => {
      if (isValidElement(child) && (child.type === SpotlightBannerAside || child.type === SpotlightBannerMain)) {
        return child;
      }
    });
  };

  return <div className="spotlight-banner spotlight-banner--header">{renderValidChildren()}</div>;
};

export { SpotlightBanner };
