import classNames from 'classnames';
import React, { Children, FunctionComponent, isValidElement, ReactNode } from 'react';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { VisualisationSectionMain } from './VisualisationSectionMain';

const VisualisationSection: FunctionComponent<{ className?: string }> = ({ children, className }) => {
  const renderContent = (): ReactNode =>
    Children.map(children, child => {
      if (isValidElement(child) && (child.type === SpotlightSidebar || child.type === VisualisationSectionMain)) {
        return child;
      }
    });

  return <div className={classNames('spotlight', className)}>{renderContent()}</div>;
};

export { VisualisationSection };
