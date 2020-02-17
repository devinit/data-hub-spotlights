import React, { Children, FunctionComponent, isValidElement } from 'react';
import { TabContainer } from './TabContainer';

const SpotlightTab: FunctionComponent = ({ children }) => {
  const renderTabs = () => {
    return Children.map(children, child => (isValidElement(child) && child.type === TabContainer ? child : null));
  };

  return <div className="tabs">{renderTabs()}</div>;
};

export { SpotlightTab };
