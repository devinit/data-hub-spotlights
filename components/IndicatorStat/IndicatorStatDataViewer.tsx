import React, { FunctionComponent, ReactText } from 'react';
import { ContentNote } from '../../utils';
import { SpotlightPopup } from '../SpotlightPopup';

interface IndicatorStatDataProps {
  note?: ContentNote;
  value?: ReactText;
}

const IndicatorStatDataViewer: FunctionComponent<IndicatorStatDataProps> = ({ value, note }) => {
  return (
    <p className="spotlight__stat-data">
      {value}
      {note && note.content ? (
        <span className="spotlight__stat-data__note">
          {note.content}{' '}
          {note.meta ? <SpotlightPopup description={note.meta.description} source={note.meta.source} /> : null}
          <style jsx>{`
            transform: none;
            position: relative;
            top: -10px;
          `}</style>
        </span>
      ) : null}
    </p>
  );
};

export { IndicatorStatDataViewer };
