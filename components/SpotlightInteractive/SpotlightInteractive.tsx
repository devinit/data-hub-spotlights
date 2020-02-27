import React, { FunctionComponent } from 'react';

interface SpotlightInteractiveProps {
  maxHeight?: string;
  minHeight?: string;
}

const SpotlightInteractive: FunctionComponent<SpotlightInteractiveProps> = ({ minHeight, maxHeight, children }) => {
  return (
    <div>
      {children}
      <style jsx>{`
        min-height: ${minHeight};
        height: 100%;
        border: 1px solid #e84439;
        ${maxHeight
          ? `
            overflow: hidden;
            max-height: ${maxHeight}
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
