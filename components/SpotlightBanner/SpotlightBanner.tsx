import classNames from 'classnames';
import React, { Children, FunctionComponent, isValidElement } from 'react';
import { SpotlightBannerAside } from './SpotlightBannerAside';
import { SpotlightBannerMain } from './SpotlightBannerMain';
import { Button } from '../Button';

interface SpotlightBannerProps {
  className?: string;
}

const SpotlightBanner: FunctionComponent<SpotlightBannerProps> = ({ children, className }) => {
  const renderValidChildren = () => {
    return Children.map(children, child => {
      if (
        isValidElement(child) &&
        (child.type === SpotlightBannerAside || child.type === SpotlightBannerMain || child.type === Button)
      ) {
        return child;
      }
    });
  };

  return <div className={classNames('spotlight-banner', className)}>{renderValidChildren()}</div>;
};

export { SpotlightBanner };
