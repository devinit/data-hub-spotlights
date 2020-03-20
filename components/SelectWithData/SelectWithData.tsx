import React, { FunctionComponent, useEffect, useState, CSSProperties } from 'react';
import { SelectOptions, SelectOption, AsyncSelect } from '../Select';
import { getBoundariesByCountryCode, createLocationOptions, SpotlightLocation } from '../../utils';
import { SpotlightBannerMain } from '../SpotlightBanner';
import { ValueType, OptionTypeBase } from 'react-select';

interface SelectWithDataProps {
  show?: boolean;
  countryCode: string;
  onWidgetClick: (widgetState: boolean, option: SpotlightLocation) => void;
  styles?: {};
}

const noOptionsMessage = (obj: { inputValue: string }): string =>
  obj.inputValue ? `No results for ${obj.inputValue}` : 'Type to search ...';

const SelectWithData: FunctionComponent<SelectWithDataProps> = ({ countryCode, onWidgetClick, show }) => {
  const [options, setOptions] = useState<SelectOptions>([]);
  useEffect(() => {
    getBoundariesByCountryCode(countryCode).then(boundaries => {
      setOptions(createLocationOptions(boundaries, 'd')); // TODO: allow greater depth when sub-county data comes in
    });
  }, [countryCode]);

  const onSelectLocation = (option?: SelectOption): void => {
    if (option) {
      onWidgetClick(false, { name: option.label.toUpperCase(), geocode: option.value });
    }
  };

  const loadOptions = async (inputValue: string): Promise<SelectOptions> =>
    options && inputValue
      ? await options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
      : [];

  return show ? (
    <SpotlightBannerMain>
      {options && options.length ? (
        <AsyncSelect
          loadOptions={loadOptions}
          placeholder="Search for a location"
          isLoading={!(options && options.length)}
          chooseTheme="dark"
          isClearable
          defaultOptions
          styles={{
            dropdownIndicator: (provided): CSSProperties => ({ ...provided, display: 'none' }),
            indicatorSeparator: (provided): CSSProperties => ({ ...provided, display: 'none' }),
            singleValue: (provided): CSSProperties => ({ ...provided, textTransform: 'capitalize' })
          }}
          noOptionsMessage={noOptionsMessage}
          onChange={onSelectLocation as (options: ValueType<OptionTypeBase>) => void}
          autoFocus={true}
        />
      ) : null}
    </SpotlightBannerMain>
  ) : (
    <span />
  );
};

export { SelectWithData };
