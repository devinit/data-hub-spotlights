import React, { FunctionComponent, ReactText } from 'react';
import { ContentNote } from '../../utils';
import { SpotlightPopup } from '../SpotlightPopup';

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
          {note.content}{' '}
          {note.meta ? <SpotlightPopup description={note.meta.description} source={note.meta.source} /> : null}
        </span>
      ) : null}
    </p>
  );
};

export { IndicatorStatDataViewer };
