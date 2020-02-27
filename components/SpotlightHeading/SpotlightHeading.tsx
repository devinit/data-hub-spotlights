import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface SpotlightHeadingProps {
  className?: string;
}

const SpotlightHeading: FunctionComponent<SpotlightHeadingProps> = ({ className, children }) => {
  return <h2 className={classNames('spotlight__heading', className)}>{children}</h2>;
};

export { SpotlightHeading };
