import React, { FunctionComponent } from 'react';
import { Button } from '../Button';
import classNames from 'classnames';

interface SpotlightShareProps {
  maxHeight?: string;
  minHeight?: string;
  className?: string;
}

const SpotlightShare: FunctionComponent<SpotlightShareProps> = props => {
  return (
    <div className={classNames(props.className)}>
      <Button>Share this visualization</Button>
    </div>
  );
};

SpotlightShare.defaultProps = {
  minHeight: '500px'
};

export { SpotlightShare };
