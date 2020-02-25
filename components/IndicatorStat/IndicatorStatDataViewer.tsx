import React, { FunctionComponent, ReactText } from 'react';
import { ContentNote } from '../../utils';

interface IndicatorStatDataProps {
  note?: ContentNote;
  value?: ReactText;
}

// TODO: implement proper tooltip handling
const IndicatorStatDataViewer: FunctionComponent<IndicatorStatDataProps> = ({ value, note }) => {
  return (
    <p className="spotlight__stat-data">
      {value}
      {note && note.content ? (
        <span className="spotlight__stat-data__note">
          {note}{' '}
          {note.meta ? (
            <span className="spotlight__stat-icon">
              <i role="presentation" aria-hidden="true" className="ico ico--12 ico-info-slate"></i>
            </span>
          ) : null}
        </span>
      ) : null}
    </p>
  );
};

export { IndicatorStatDataViewer };
