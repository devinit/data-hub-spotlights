import React, { FunctionComponent } from 'react';
import ReactSelect, { GroupedOptionsType, OptionsType, Props as SelectProps, Styles } from 'react-select';

export type SelectOptions =
  GroupedOptionsType<{ label: string; value: string; }> | OptionsType<{ label: string; value: string; }> | undefined;

export interface SelectOption {
  label: string;
  value: string;
}

const Select: FunctionComponent<SelectProps> = (props) => {
  const borderColor = '#8f1b13';
  const styles: Styles = {
    container: provided => ({ ...provided, fontSize: '1.6rem' }),
    control: provided => ({
      ...provided,
      ':hover': { borderColor },
      borderColor,
      'boxShadow': 'none',
      'height': '48px',
      'borderRadius': '0',
      'z-index': 10000
    }),
    menu: provided => ({
      ...provided,
      'z-index': 10000
    }),
    option: (provided, state) => ({
      ...provided,
      ':hover': { backgroundColor: '#f0826d' },
      'backgroundColor': state.isSelected ? borderColor : 'transparent',
      'z-index': 10000
    })
  };

  return <ReactSelect { ...props } styles={ { ...styles, ...props.styles } } />;
};

export { Select };
