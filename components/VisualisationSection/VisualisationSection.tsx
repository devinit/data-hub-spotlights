import React, { Children, FunctionComponent, isValidElement } from 'react';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { VisualisationSectionMain } from './VisualisationSectionMain';

const VisualisationSection: FunctionComponent = ({ children }) => {
  const renderContent = () =>
    Children.map(children, child => {
      if (isValidElement(child) && (child.type === SpotlightSidebar || child.type === VisualisationSectionMain)) {
        return child;
      }
    });

  return <div className="spotlight">{renderContent()}</div>;
};

export { VisualisationSection };
