import React, { Children, FunctionComponent, isValidElement } from 'react';
import { LegendItem } from './LegendItem';

const Legend: FunctionComponent = ({ children }) => {
  return (
    <div className="spotlight-legend" data-testid="spotlight-legend">
      {Children.map(children, child => {
        if (isValidElement(child) && child.type === LegendItem) {
          return child;
        }
      })}
    </div>
  );
};

export { Legend };
