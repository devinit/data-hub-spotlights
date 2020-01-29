import React, { FunctionComponent } from 'react';
import { FormField } from '../FormField';
import { Select, SelectOption, SelectOptions } from '../Select';

interface FormProps {
  indicators?: SelectOptions;
  activeIndicator?: SelectOption;
  onSelectIndicator?: (option?: SelectOption) => void;
  years?: any;
  activeYear?: number;
  onSelectYear?: (option?: SelectOption) => void;
}

const MapSectionHeaderForm: FunctionComponent<FormProps> =
  ({ indicators, activeIndicator, onSelectIndicator, years, activeYear, onSelectYear }) =>
    <>
      <FormField>
        <label className="form-label">Indicator</label>
        <Select
          isDisabled={ !indicators || !indicators.length }
          options={ indicators }
          value={ activeIndicator || null }
          onChange={ onSelectIndicator }
          placeholder="Select Indicator"
        />
      </FormField>
      <FormField>
        <label className="form-label">Year</label>
        <Select
          isDisabled={ !indicators || !indicators.length }
          placeholder="Select Year"
          options={ years }
          value={ activeYear ? { value: `${activeYear}`, label: `${activeYear}` } : null }
          onChange={ onSelectYear }
        />
      </FormField>
      <FormField><button type="button" className="button">Update</button></FormField>
    </>;

export default MapSectionHeaderForm;
