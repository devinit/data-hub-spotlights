import React, { CSSProperties, FunctionComponent, useEffect, useState } from 'react';
import { OptionTypeBase, Styles, ValueType } from 'react-select';
import { createLocationOptions, SpotlightBoundary, SpotlightLocation } from '../../utils';
import { BoundaryMenu } from '../BoundaryMenu';
import { AsyncSelect, SelectOption, SelectOptions } from '../Select';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerMain } from '../SpotlightBanner';
import { MenuListItem } from '../SpotlightMenu';

interface LocationSelectionBannerProps {
  className?: string;
  boundaries: SpotlightBoundary[];
  location?: SpotlightLocation;
  onSelectLocation: (location?: SpotlightLocation) => void;
  selectStyles?: Partial<Styles>;
  heading?: string;
  canReset?: boolean;
}

const noOptionsMessage = (obj: { inputValue: string }): string =>
  obj.inputValue ? `No results for ${obj.inputValue}` : 'Type to search ...';

const LocationSelectionBanner: FunctionComponent<LocationSelectionBannerProps> = (props) => {
  const [options, setOptions] = useState<SelectOptions>([]);
  useEffect(() => {
    setOptions(createLocationOptions(props.boundaries, 'd')); // TODO: allow greater depth when sub-county data comes in
  }, [props.boundaries]);

  const onSelectLocation = (option?: SelectOption | MenuListItem | null): void => {
    props.onSelectLocation(option && option.value ? { geocode: option.value, name: option.label } : undefined);
  };
  const loadOptions = async (inputValue: string): Promise<SelectOptions> =>
    options && inputValue
      ? await options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()))
      : [];

  return (
    <SpotlightBanner className={props.className}>
      {props.heading ? <h3 className="spotlight-banner__heading">{props.heading}</h3> : null}
      <SpotlightBannerAside>
        <BoundaryMenu boundaries={props.boundaries} onSelectLocation={onSelectLocation} canReset={props.canReset} />
      </SpotlightBannerAside>
      <SpotlightBannerMain>
        <div>
          {options && options.length ? (
            <AsyncSelect
              loadOptions={loadOptions}
              placeholder="Search for a location"
              isLoading={!(options && options.length)}
              chooseTheme="dark"
              isClearable={props.canReset}
              defaultOptions
              styles={{
                dropdownIndicator: (provided): CSSProperties => ({ ...provided, display: 'none' }),
                indicatorSeparator: (provided): CSSProperties => ({ ...provided, display: 'none' }),
                singleValue: (provided): CSSProperties => ({ ...provided, textTransform: 'capitalize' }),
                ...props.selectStyles,
              }}
              noOptionsMessage={noOptionsMessage}
              onChange={onSelectLocation as (options: ValueType<OptionTypeBase>) => void}
            />
          ) : null}
          {props.children}
          <style jsx>{`
            display: flex;
          `}</style>
        </div>
      </SpotlightBannerMain>
    </SpotlightBanner>
  );
};

LocationSelectionBanner.defaultProps = { canReset: true, boundaries: [] };

export { LocationSelectionBanner };
