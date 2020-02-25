import React, { FunctionComponent } from 'react';
import { ContentMeta } from '../../utils';

interface IndicatorStatProps {
  heading?: string;
  meta?: ContentMeta;
}
// TODO: add proper tooltip for description & source
const IndicatorStat: FunctionComponent<IndicatorStatProps> = ({ meta = {}, heading, children }) => {
  return (
    <div className="spotlight__stat">
      <h3 className="spotlight__stat-heading">
        {heading}
        {meta.description || meta.source ? (
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

IndicatorStat.defaultProps = { meta: {} };

export { IndicatorStat };
