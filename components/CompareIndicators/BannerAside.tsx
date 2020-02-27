import React, { FunctionComponent } from 'react';

interface BannerAsideProps {
  classname: string;
}

const BannerAside: FunctionComponent<BannerAsideProps> = ({ children, classname }) => {
  return <div className={classname}>{children}</div>;
};
export { BannerAside };
