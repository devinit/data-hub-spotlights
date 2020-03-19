import React, { FunctionComponent } from 'react';

interface AnchorButtonProps {
  link?: string;
}

const AnchorButton: FunctionComponent<AnchorButtonProps> = ({ children, link }) => {
  return (
    <a className="button" href={link}>
      <style jsx>{`
        cursor: pointer;
      `}</style>
      {children}
    </a>
  );
};
export { AnchorButton };
