import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  className?: string;
  onClick?: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button type="button" className={classNames('button', className)} onClick={onClick}>
      {children}
    </button>
  );
};
export { Button };
