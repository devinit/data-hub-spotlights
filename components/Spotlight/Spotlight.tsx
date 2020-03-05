import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface SpotlightProps {
  className?: string;
}

const Spotlight: FunctionComponent<SpotlightProps> = ({ children, className }) => (
  <div className={classNames('spotlight', className)}>{children}</div>
);

export { Spotlight };
