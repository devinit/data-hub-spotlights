import React, { FunctionComponent } from 'react';
import LoadingOverlay from 'react-loading-overlay';

interface LoadingProps {
  active: boolean;
  text?: string;
}

const Loading: FunctionComponent<LoadingProps> = ({ children, active, text }) => {
  return (
    <LoadingOverlay active={ active } spinner text={ text } styles={ { wrapper: { height: '100%' } } }>
      { children }
    </LoadingOverlay>
  );
};

Loading.defaultProps = {
  text: 'Loading ...'
};

export { Loading };
