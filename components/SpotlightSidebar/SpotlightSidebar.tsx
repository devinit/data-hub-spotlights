import React, { Children, FunctionComponent, isValidElement } from 'react';
import classNames from 'classnames';
import { SidebarContent } from './SidebarContent';
import { SpotlightHeading } from '../SpotlightHeading';

const SpotlightSidebar: FunctionComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <div className={classNames('spotlight__aside', className)}>
      {Children.map(children, child =>
        isValidElement(child) && (child.type === SidebarContent || child.type === SpotlightHeading) ? child : null
      )}
      <style jsx>{`
        min-height: 500px;
      `}</style>
    </div>
  );
};

export { SpotlightSidebar };
