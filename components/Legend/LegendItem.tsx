import React, { FunctionComponent } from 'react';

export interface LegendItemProps {
  className?: string;
  bgColor?: string;
  textColor?: string;
}

export const LegendItem: FunctionComponent<LegendItemProps> = ({ children, className, bgColor, textColor }) =>
  <span className={ className } data-testid="spotlight-legend-item">
    { children }
    <style jsx>{ `
      span {
        background-color: ${bgColor || 'inherit'};
        color: ${textColor || 'inherit'};
      }
    ` }</style>
  </span>;
