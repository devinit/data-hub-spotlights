import React, { FunctionComponent } from 'react';

const SpotlightButtons: FunctionComponent = (props) => {
  return <div className="spotlight-buttons">{props.children}</div>;
};

export { SpotlightButtons };
