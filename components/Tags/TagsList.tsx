import React, { FunctionComponent } from 'react';

const TagsList: FunctionComponent = ({ children }) => {
  return <ul className="m-pills">{children}</ul>;
};

export { TagsList };
