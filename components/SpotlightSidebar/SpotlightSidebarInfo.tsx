import React, { FunctionComponent } from 'react';

interface SpotlightSidebarInfoProps {
  heading?: string;
  description?: string;
}

const SpotlightSidebarInfo: FunctionComponent<SpotlightSidebarInfoProps> = (props) => {
  return (
    <div className="spotlight-description">
      <h3 className="spotlight__subheading">{props.heading}</h3>
      <p className="spotlight__excerpt">{props.description}</p>
    </div>
  );
};

export { SpotlightSidebarInfo };
