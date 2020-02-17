import React, { FunctionComponent } from 'react';

const TabContent: FunctionComponent = ({ children }) => {
  return <article className="tabs__content">{children}</article>;
};

export { TabContent };
