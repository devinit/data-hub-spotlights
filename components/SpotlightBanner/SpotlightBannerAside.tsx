import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface SpotlightBannerAsideProps {
  className?: string;
}

const SpotlightBannerAside: FunctionComponent<SpotlightBannerAsideProps> = ({ children, className }) => (
  <div className={classNames('spotlight-banner__aside', className)}>{children}</div>
);

export { SpotlightBannerAside };
