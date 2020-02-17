import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

const FormField: FunctionComponent<{ className?: string }> = ({ className, children }) => (
  <div className={classNames('form-field', className)}>{children}</div>
);

FormField.defaultProps = { className: 'form-field--inline-block' };

export { FormField };
