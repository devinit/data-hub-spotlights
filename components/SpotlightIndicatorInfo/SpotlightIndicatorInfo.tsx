import React, { FunctionComponent } from 'react';

interface SpotlightIndicatorInfoProps {
  heading?: string;
  description?: string;
}

const SpotlightIndicatorInfo: FunctionComponent<SpotlightIndicatorInfoProps> = props => {
  return (
    <>
      <div className="spotlight__subheading">{ props.heading }</div>
      <p className="spotlight__excerpt">{ props.description }</p>
    </>
  );
};

export { SpotlightIndicatorInfo };
