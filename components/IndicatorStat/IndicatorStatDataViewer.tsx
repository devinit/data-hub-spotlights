import React, { FunctionComponent, ReactText } from 'react';

interface IndicatorStatDataProps {
  note?: ReactText;
  value?: ReactText;
}

const IndicatorStatDataViewer: FunctionComponent<IndicatorStatDataProps> = ({ value, note }) => {
  return (
    <p className="spotlight__stat-data">
      {value}
      {note ? <span className="spotlight__stat-data__note">{note}</span> : null}
    </p>
  );
};

export { IndicatorStatDataViewer };
