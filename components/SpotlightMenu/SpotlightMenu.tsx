import React, { FunctionComponent } from 'react';

interface SpotlightMenuProps {
  show?: boolean;
}

const SpotlightMenu: FunctionComponent<SpotlightMenuProps> = ({ children, show }) => {
  return (
    <div className="spotlight__menu">
      {children}
      <style jsx>
        {`
          .spotlight__menu {
            display: ${show ? 'block' : 'none'};
          }
        `}
      </style>
    </div>
  );
};

SpotlightMenu.defaultProps = {
  show: true
};

export { SpotlightMenu };
