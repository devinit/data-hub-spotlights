import React, { FunctionComponent, useEffect, useState, CSSProperties } from 'react';
import { Select, SelectOptions, SelectOption } from '../Select';
import { getBoundariesByCountryCode, createLocationOptions, SpotlightLocation } from '../../utils';

interface SelectWithDataProps {
  show?: boolean;
  countryCode: string;
  onWidgetClick: (widgetState: boolean, option: SpotlightLocation) => void;
  width: string;
}

const SelectWithData: FunctionComponent<SelectWithDataProps> = ({ countryCode, onWidgetClick, show, width }) => {
  const [options, setOptions] = useState<SelectOptions>([]);
  useEffect(() => {
    getBoundariesByCountryCode(countryCode).then(boundaries => {
      setOptions(createLocationOptions(boundaries, 'd')); // TODO: allow greater depth when sub-county data comes in
    });
  }, [countryCode]);

  const onSelectLocation = (option?: SelectOption): void => {
    if (option) {
      onWidgetClick(false, { name: option.label, geocode: option.value });
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
      styles={{
        container: (provided: React.CSSProperties): CSSProperties => ({ ...provided, width, fontSize: '1.6rem' })
      }}
    />
  ) : (
    <span />
  );
};

export { SelectWithData };
