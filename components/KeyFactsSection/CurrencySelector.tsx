import React, { FunctionComponent } from 'react';
import { Select, SelectOption } from '../Select';

interface CurrencySelectorProps {
  currencyCode: string; // for local currency - only alternative is US$
  onChange?: (isLocalCurrency: boolean) => void;
}

const getOptions = (currencyCode: string): SelectOption[] => [
  { label: 'Constant 2015 USD', value: '$' },
  { label: `Current ${currencyCode}`, value: 'local' }
];

const CurrencySelector: FunctionComponent<CurrencySelectorProps> = ({ onChange, currencyCode }) => {
  const onSelectCurrency = (option: SelectOption): void => {
    if (onChange) {
      onChange(option.value === 'local');
    }
  };
  const options = getOptions(currencyCode);

  return (
    <>
      <label className="form-label">Currency</label>
      <Select options={options} onChange={onSelectCurrency} placeholder="Select Currency" defaultValue={options[0]} />
    </>
  );
};

export { CurrencySelector };
