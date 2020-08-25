import dynamic from 'next/dynamic';
import React, { FunctionComponent } from 'react';
import { FormField } from '../FormField';
import { SelectOption, SelectOptions } from '../Select';

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

const DynamicSelect = dynamic(() => import('../Select').then((mod) => mod.Select), { ssr: false });

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
      <DynamicSelect
        isDisabled={!indicators || !indicators.length}
        options={indicators}
        value={activeIndicator || (indicators ? indicators[0] : null)}
        onChange={onSelectIndicator}
        placeholder="Select Indicator"
      />
    </FormField>
    <FormField className={props.yearClassName}>
      <label className="form-label">{props.yearLabel}</label>
      <DynamicSelect
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
