import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface ComparisonSelectorFormProps {
  legendClassName?: string;
}

const SpotlightComparison: FunctionComponent<ComparisonSelectorFormProps> = ({ legendClassName, children }) => {
  return (
    <div className="spotlight__comparison">
      <span className={classNames('spotlight__comparison-legend', legendClassName)}></span>
      {children}
    </div>
  );
};

export { SpotlightComparison };
