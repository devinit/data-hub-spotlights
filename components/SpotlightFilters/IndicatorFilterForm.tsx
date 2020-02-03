import React, { FunctionComponent } from 'react';
import { Select, SelectOption, SelectOptions } from '../Select';

interface FormProps {
  indicators?: SelectOptions;
  activeIndicator?: SelectOption;
  onSelectIndicator?: (option?: SelectOption) => void;
  years?: any;
  activeYear?: number;
  onSelectYear?: (option?: SelectOption) => void;
}

const IndicatorFilterForm: FunctionComponent<FormProps> =
  ({ indicators, activeIndicator, onSelectIndicator, years, activeYear, onSelectYear }) =>
    <>
      <label className="form-label">Indicator</label>
      <Select
        isDisabled={ !indicators || !indicators.length }
        options={ indicators }
        value={ activeIndicator || null }
        onChange={ onSelectIndicator }
        placeholder="Select Indicator"
      />
      <label className="form-label">Year</label>
      <Select
        isDisabled={ !indicators || !indicators.length }
        placeholder="Select Year"
        options={ years }
        value={ activeYear ? { value: `${activeYear}`, label: `${activeYear}` } : null }
        onChange={ onSelectYear }
      />
      <button type="button" className="button">Update</button>
    </>;

export default IndicatorFilterForm;
