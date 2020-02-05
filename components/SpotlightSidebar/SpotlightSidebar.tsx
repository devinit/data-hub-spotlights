import React, { Children, FunctionComponent, isValidElement } from 'react';
import { SidebarContent } from './SidebarContent';
import { SidebarHeading } from './SidebarHeading';

const SpotlightSidebar: FunctionComponent = ({ children }) => {

  return (
    <div className="spotlight__aside spotlight__aside--padded">
      {
        Children.map(children, child =>
          isValidElement(child) && (child.type === SidebarContent || child.type === SidebarHeading) ? child : null)
      }
      <style jsx>{ `
        min-height: 500px;
      ` }</style>
    </div>
  );
};

export { SpotlightSidebar };
