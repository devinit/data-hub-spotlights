import React, { FunctionComponent } from 'react';
import { Select, SelectOption, SelectOptions } from '../Select';
import { FormField } from '../FormField';

interface FormProps {
  indicators?: SelectOptions;
  activeIndicator?: SelectOption;
  onSelectIndicator?: (option?: SelectOption) => void;
  years?: SelectOptions;
  activeYear?: number;
  onSelectYear?: (option?: SelectOption) => void;
}

const IndicatorFilterForm: FunctionComponent<FormProps> = ({
  indicators,
  activeIndicator,
  onSelectIndicator,
  years,
  activeYear,
  onSelectYear
}) => (
  <>
    <FormField className="form-field--spaced-minor">
      <label className="form-label">Choose an indicator</label>
      <Select
        isDisabled={!indicators || !indicators.length}
        options={indicators}
        value={activeIndicator || (indicators ? indicators[0] : null)}
        onChange={onSelectIndicator}
        placeholder="Select Indicator"
      />
    </FormField>
    <FormField className="form-field--inline">
      <label className="form-label">Choose a year</label>
      <Select
        isDisabled={!indicators || !indicators.length}
        placeholder="Select Year"
        options={years}
        value={activeYear ? { value: `${activeYear}`, label: `${activeYear}` } : years ? years[0] : null}
        onChange={onSelectYear}
        className="form-field__select-dropdown"
      />
    </FormField>
    <FormField className="form-field--inline">
      <button type="button" className="button">
        Update
      </button>
    </FormField>
  </>
);

export default IndicatorFilterForm;
