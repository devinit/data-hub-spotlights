import React, { FunctionComponent } from 'react';

interface ComponentProps {
  label: string;
  value: string | string[] | number;
  name: string;
  checked?: boolean;
  onClick?: (value?: string | string[] | number) => void;
}

const FormFieldRadioGroup: FunctionComponent<ComponentProps> = ({ label, name, value, checked, ...props }) => {
  const onClick = (): void => {
    if (props.onClick) {
      props.onClick(value);
    }
  };

  return (
    <div className="form-radio-group cp-form-radio-group-share" onClick={onClick}>
      <input className="form-radio" type="radio" name={name} value={value} checked={checked} />
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export { FormFieldRadioGroup };
