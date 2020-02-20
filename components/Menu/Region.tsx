import React, { Children, FunctionComponent, isValidElement } from 'react';
import { RegionItem } from './RegionItem';

const Region: FunctionComponent = ({ children }) => {
    return (
      <ul id="js-profile-nav" className="countries-menu-list__content">
        {
          Children.map(children, child => {
            if (isValidElement(child) && (child.type === RegionItem)) {
              return child;
            }
          })
        }
      </ul>
    );
};
export { Region };
