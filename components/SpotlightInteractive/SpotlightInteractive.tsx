import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface SpotlightInteractiveProps {
  maxHeight?: string;
  minHeight?: string;
  className?: string;
}

const SpotlightInteractive: FunctionComponent<SpotlightInteractiveProps> = props => {
  return (
    <div className={classNames(props.className)}>
      {props.children}
      <style jsx>{`
        min-height: ${props.minHeight};
        height: 100%;
        border: 1px solid #e84439;
        ${props.maxHeight
          ? `
            overflow: hidden;
            max-height: ${props.maxHeight}
          `
          : ''}
      `}</style>
    </div>
  );
};

SpotlightInteractive.defaultProps = {
  minHeight: '500px'
};

export { SpotlightInteractive };
