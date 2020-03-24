import React, { FunctionComponent } from 'react';

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button: FunctionComponent<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

Button.defaultProps = { type: 'button', className: 'button' };

export { Button };
