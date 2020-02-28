import React, { FunctionComponent } from 'react';
import { Select } from '../Select';
import { Props as SelectProps } from 'react-select';

interface FormFieldSelectItem {
  value: string;
  label: string;
}

interface FormFieldSelectProps extends SelectProps {
  label: string;
  options: FormFieldSelectItem[];
}

const FormFieldSelect: FunctionComponent<FormFieldSelectProps> = ({ label, options }) => {
  return (
    <>
      {label ? <label className="form-label">{label}</label> : null}
      <Select options={options} />
    </>
  );
};
export { FormFieldSelect };
