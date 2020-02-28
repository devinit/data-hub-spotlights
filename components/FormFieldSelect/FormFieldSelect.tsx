import React, { FunctionComponent } from 'react';
import { Select } from '../Select';

interface FormFieldSelectItem {
  value: string;
  label: string;
}

interface FormFieldSelectProps {
  label: string;
  options: FormFieldSelectItem[];
}

const FormFieldSelect: FunctionComponent<FormFieldSelectProps> = ({ label, options }) => {
  return (
    <>
      <label htmlFor="topic" className="form-label">
        {label}
      </label>
      <div className="form-field__select-dropdown">
        <Select options={options} />
      </div>
    </>
  );
};
export { FormFieldSelect };
