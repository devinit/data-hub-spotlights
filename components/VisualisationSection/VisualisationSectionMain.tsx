import React, { FunctionComponent } from 'react';

const VisualisationSectionMain: FunctionComponent = ({ children }) => (
  <div className="spotlight__main">
    {children}
    <style jsx>{`
      .spotlight__main :global(.leaflet-container) {
        background: inherit;
      }
    `}</style>
  </div>
);

export { VisualisationSectionMain };
