import React, { FunctionComponent } from 'react';

interface IndicatorStatProps {
  heading?: string;
  description?: string;
  source?: string;
  value?: string;
}

const IndicatorStat: FunctionComponent<IndicatorStatProps> = ({ description, heading, source, value }) => {
  return (
    <div className="l-2up-3up__col">
      <div className="spotlight__stat">
        <h3 className="spotlight__stat-heading">
          {heading}
          {description || source ? (
            <span className="spotlight__stat-icon">
              <i role="presentation" aria-hidden="true" className="ico ico--12 ico-info-slate"></i>
            </span>
          ) : null}
        </h3>
        <p className="spotlight__stat-data">{value}</p>
      </div>
    </div>
  );
};

export { IndicatorStat };
