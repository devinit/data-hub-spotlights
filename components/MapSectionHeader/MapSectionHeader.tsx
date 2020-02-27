import React, { FunctionComponent, useEffect, useState } from 'react';
import { SpotlightLocation } from '../../utils';
import { Select, SelectOption, SelectOptions } from '../Select';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerForm, SpotlightBannerMain } from '../SpotlightBanner';
import { SpotlightBoundary } from '../SpotlightMap';

interface MapSectionHeaderProps {
  countryCode: string;
  onSelectLocation: (location?: SpotlightLocation) => void;
}

// TODO: this is temporary - replace with correct location handler
const createLocationOptions = (locations: SpotlightBoundary[]): SelectOptions => {
  let districts: SpotlightBoundary[] = [];
  locations.forEach(location => {
    districts = districts.concat(location.children);
  });
  const options: SelectOption[] = districts.map(content => ({
    label: content.name,
    value: content.geocode
  }));

  return options;
};

const MapSectionHeader: FunctionComponent<MapSectionHeaderProps> = props => {
  const [options, setOptions] = useState<SelectOptions>([]);
  useEffect(() => {
    import(`../../boundaries/${props.countryCode}`).then(({ default: boundaries }) => {
      setOptions(createLocationOptions(boundaries));
    });
  }, [props.countryCode]);

  const onSelectLocation = (option?: SelectOption): void => {
    props.onSelectLocation(option && option.value ? { geocode: option.value, name: option.label } : undefined);
  };

  return (
    <SpotlightBanner header>
      <SpotlightBannerAside>
        <Select
          options={options}
          onChange={onSelectLocation}
          placeholder="Select Location"
          isLoading={!(options && options.length)}
          chooseTheme="dark"
          isClearable
        />
      </SpotlightBannerAside>
      <SpotlightBannerMain>
        <SpotlightBannerForm />
      </SpotlightBannerMain>
    </SpotlightBanner>
  );
};

export { MapSectionHeader };
