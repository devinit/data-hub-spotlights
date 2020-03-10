import React, { FunctionComponent } from 'react';
import { Button } from '../Button';
import classNames from 'classnames';

interface SpotlightShareProps {
  maxHeight?: string;
  minHeight?: string;
  className?: string;
}

const SpotlightShare: FunctionComponent<SpotlightShareProps> = props => {
  const handleClick = (e: any) => {
    console.log(e);
  };
  return (
    <div className={classNames(props.className)}>
      <Button onClick={handleClick}>Share this visualisation</Button>
    </div>
  );
};

SpotlightShare.defaultProps = {
  minHeight: '500px'
};

export { SpotlightShare };
