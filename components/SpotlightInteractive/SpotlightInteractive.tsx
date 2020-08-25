import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface SpotlightInteractiveProps {
  maxHeight?: string;
  minHeight?: string;
  className?: string;
  height?: string;
  background?: string;
}

const SpotlightInteractive: FunctionComponent<SpotlightInteractiveProps> = (props) => {
  return (
    <div className={classNames(props.className)}>
      {props.children}
      <style jsx>{`
        position: relative;
        min-height: ${props.minHeight};
        height: ${props.height};
        background: ${props.background};
        ${props.maxHeight
          ? `
            overflow: scroll;
            max-height: ${props.maxHeight}
          `
          : ''}
      `}</style>
    </div>
  );
};

SpotlightInteractive.defaultProps = {
  minHeight: '500px',
  height: 'auto',
  background: 'inherit',
};

export { SpotlightInteractive };
