import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  className: string;
}

const Button: FunctionComponent<ButtonProps> = ({ children, className }) => {
  return (
    <button type="button" className={classNames('button', className)}>
      {children}
    </button>
  );
};
export { Button };
