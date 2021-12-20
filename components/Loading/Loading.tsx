import React, { FunctionComponent } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';

interface LoadingProps {
  active: boolean;
  text?: string;
}

const Loading: FunctionComponent<LoadingProps> = ({ children, active, text }) => {
  return (
    <LoadingOverlay
      active={active}
      spinner
      text={text}
      styles={{ wrapper: { height: '100%' }, spinner: {}, overlay: {}, content: {} }}
    >
      {children}
    </LoadingOverlay>
  );
};

Loading.defaultProps = {
  text: 'Loading ...',
};

export { Loading };
