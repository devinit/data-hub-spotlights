import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

const FormField: FunctionComponent<{ className?: string }> = ({ className, children }) => (
  <div className={classNames('form-field', className)}>
    {children}
    <style jsx>{`
      z-index: auto;
      margin-left: 5px;
    `}</style>
  </div>
);

FormField.defaultProps = { className: 'form-field--inline-block' };

export { FormField };
