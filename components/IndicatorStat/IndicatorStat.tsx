import React, { FunctionComponent } from 'react';

interface IndicatorStatProps {
  heading?: string;
  description?: string;
  source?: string;
}
// TODO: add proper tooltip for description & source
const IndicatorStat: FunctionComponent<IndicatorStatProps> = ({ description, heading, source, children }) => {
  return (
    <div className="spotlight__stat">
      <h3 className="spotlight__stat-heading">
        {heading}
        {description || source ? (
          <span className="spotlight__stat-icon">
            <i role="presentation" aria-hidden="true" className="ico ico--12 ico-info-slate"></i>
            <style jsx>{`
              .spotlight__stat-icon {
                display: none;
              }
            `}</style>
          </span>
        ) : null}
      </h3>
      {children}
    </div>
  );
};

export { IndicatorStat };
