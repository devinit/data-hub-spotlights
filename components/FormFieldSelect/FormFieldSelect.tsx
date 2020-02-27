import React, { FunctionComponent } from 'react';
import { Select } from '../Select';

interface FormFieldSelectItem {
  value: string;
  label: string;
}

interface FormFieldSelectProps {
  label: string;
  options: FormFieldSelectItem[];
  themeColor: 'light' | 'dark';
}

const FormFieldSelect: FunctionComponent<FormFieldSelectProps> = ({ label, options, themeColor }) => {
  return (
    <>
      <label htmlFor="topic" className="form-label">
        {label}
      </label>
      <div className="form-field__select-dropdown">
        <Select options={options} chooseTheme={themeColor} />
      </div>
    </>
  );
};
export { FormFieldSelect };
