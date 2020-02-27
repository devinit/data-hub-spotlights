import classNames from 'classnames';
import React, { Children, FunctionComponent, isValidElement, ReactNode } from 'react';
import { SpotlightBannerAside } from './SpotlightBannerAside';
import { SpotlightBannerMain } from './SpotlightBannerMain';

const SpotlightBanner: FunctionComponent<{ header?: boolean }> = ({ children, header }) => {
  const renderValidChildren = (): ReactNode => {
    return Children.map(children, child => {
      if (isValidElement(child) && (child.type === SpotlightBannerAside || child.type === SpotlightBannerMain)) {
        return child;
      }
    });
  };

  return (
    <div className={classNames('spotlight-banner', { 'spotlight-banner--header': header })}>
      {renderValidChildren()}
    </div>
  );
};

SpotlightBanner.defaultProps = {
  header: false
};

export { SpotlightBanner };
