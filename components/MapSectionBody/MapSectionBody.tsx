import React, { Children, FunctionComponent, isValidElement } from 'react';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { MapSectionBodyMain } from './MapSectionBodyMain';

const MapSectionBody: FunctionComponent = ({ children }) => {
  const renderContent = () =>
    Children.map(children, child => {
      if (isValidElement(child) && (child.type === SpotlightSidebar || child.type === MapSectionBodyMain)) {
        return child;
      }
    });

  return <div className="spotlight">{renderContent()}</div>;
};

export { MapSectionBody };
