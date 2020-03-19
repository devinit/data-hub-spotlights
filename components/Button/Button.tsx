import React, { FunctionComponent } from 'react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  className?: string;
  onClick?: () => void;
  show?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({ children, className, onClick, show = true }) => {
  return (
    <button type="button" className={className} onClick={onClick}>
      <style jsx>{`
        display: ${show ? 'block' : 'none'};
      `}</style>
      {children}
    </button>
  );
};
export { Button };
