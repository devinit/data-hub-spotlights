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
  indicatorLabel?: string;
  yearLabel?: string;
  indicatorClassName?: string; // for the form field
  yearClassName?: string; // for the form field
}

const IndicatorFilterForm: FunctionComponent<FormProps> = ({
  indicators,
  activeIndicator,
  onSelectIndicator,
  years,
  activeYear,
  onSelectYear,
  ...props
}) => (
  <>
    <FormField className={props.indicatorClassName}>
      <label className="form-label">{props.indicatorLabel}</label>
      <Select
        isDisabled={!indicators || !indicators.length}
        options={indicators}
        value={activeIndicator || (indicators ? indicators[0] : null)}
        onChange={onSelectIndicator}
        placeholder="Select Indicator"
      />
    </FormField>
    <FormField className={props.yearClassName}>
      <label className="form-label">{props.yearLabel}</label>
      <Select
        isDisabled={!indicators || !indicators.length}
        placeholder="Select Year"
        options={years}
        value={activeYear ? { value: `${activeYear}`, label: `${activeYear}` } : years ? years[0] : null}
        onChange={onSelectYear}
        className="form-field__select-dropdown"
      />
    </FormField>
  </>
);

export default IndicatorFilterForm;
