import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  className?: string;
  onButtonClick?: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({ children, className, onButtonClick }) => {
  return (
    <button type="button" className={classNames('button', className)} onClick={onButtonClick}>
      {children}
    </button>
  );
};
export { Button };
