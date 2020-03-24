import React, { FunctionComponent } from 'react';

type AnchorButtonProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

const AnchorButton: FunctionComponent<AnchorButtonProps> = ({ children, ...props }) => (
  <a {...props}>
    <style jsx>{`
      cursor: pointer;
    `}</style>
    {children}
  </a>
);

AnchorButton.defaultProps = { className: 'button' };

export { AnchorButton };
