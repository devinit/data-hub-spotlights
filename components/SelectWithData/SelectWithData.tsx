import React, { FunctionComponent, useEffect, useState } from 'react';
import { Select, SelectOptions, SelectOption } from '../Select';
import { getBoundariesByCountryCode, createLocationOptions } from '../../utils';

interface SelectWithDataProps {
  show?: boolean;
  countryCode: string;
  onWidgetClick: (widgetState: boolean, tagName: string) => void;
}

const SelectWithData: FunctionComponent<SelectWithDataProps> = ({ countryCode, onWidgetClick, show }) => {
  const [options, setOptions] = useState<SelectOptions>([]);
  useEffect(() => {
    getBoundariesByCountryCode(countryCode).then(boundaries => {
      setOptions(createLocationOptions(boundaries, 'd')); // TODO: allow greater depth when sub-county data comes in
    });
  }, [countryCode]);

  const onSelectLocation = (option?: SelectOption): void => {
    if (option) {
      onWidgetClick(false, option.label);
    }
  };

  return show ? (
    <Select
      options={options}
      onChange={onSelectLocation}
      placeholder="Select Location"
      isLoading={!(options && options.length)}
      chooseTheme="dark"
      isClearable
    />
  ) : (
    <span />
  );
};

export { SelectWithData };
