import React, { FunctionComponent } from 'react';

interface SpotlightBannerAsideProps {
  className: string;
}

const SpotlightBannerAside: FunctionComponent<SpotlightBannerAsideProps> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export { SpotlightBannerAside };
