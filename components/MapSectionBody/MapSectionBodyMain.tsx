import React, { FunctionComponent } from 'react';

const MapSectionBodyMain: FunctionComponent = ({ children }) => {
  return (
    <div className="spotlight__main spotlight__interactive">
      { children }
    </div>
  );
};

export { MapSectionBodyMain };
