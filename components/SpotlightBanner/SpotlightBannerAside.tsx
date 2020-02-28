import React, { FunctionComponent } from 'react';

interface SpotlightBannerAsideProps {
  classname: string;
}

const SpotlightBannerAside: FunctionComponent<SpotlightBannerAsideProps> = ({ children, classname }) => (
  <div className={classname}>{children}</div>
);

export { SpotlightBannerAside };
