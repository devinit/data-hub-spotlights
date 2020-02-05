import React, { FunctionComponent } from 'react';

const MapSectionBodyMain: FunctionComponent = ({ children }) =>
  <div className="spotlight__main">
    { children }
    <style jsx>{ `
      min-height: 500px;
      border: 1px solid #e84439;

      .spotlight__main :global(.leaflet-container) {
        background: inherit;
      }
    ` }</style>
  </div>;

export { MapSectionBodyMain };
