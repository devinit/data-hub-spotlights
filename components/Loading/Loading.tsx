import React, { FunctionComponent } from 'react';

const Loading: FunctionComponent = ({ children }) => {
  return (
    <div>
      { children || 'Loading ...' }
      <style jsx>{ `
        div {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -15px;
          margin-top: -15px;
          color: #000;
          font-size: 25px;
        }
      ` }</style>
    </div>
  );
};

export { Loading };
