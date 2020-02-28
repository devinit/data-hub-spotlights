import React, { FunctionComponent } from 'react';
import { Select } from '../Select';
import { Props as SelectProps } from 'react-select';

interface FormFieldSelectItem {
  value: string;
  label: string;
}

interface FormFieldSelectProps extends SelectProps {
  label?: string;
  options: FormFieldSelectItem[];
  chooseTheme?: 'light' | 'dark';
}

const FormFieldSelect: FunctionComponent<FormFieldSelectProps> = ({ label, options, chooseTheme: theme }) => {
  return (
    <>
      {label ? <label className="form-label">{label}</label> : null}
      <Select options={options} chooseTheme={theme} />
    </>
  );
};

FormFieldSelect.defaultProps = { chooseTheme: 'light' };

export { FormFieldSelect };
