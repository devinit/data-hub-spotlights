import React, { FunctionComponent, useEffect, useState } from 'react';
import { SpotlightLocation } from '../../utils';
import { Select, SelectOption, SelectOptions } from '../Select';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerForm, SpotlightBannerMain } from '../SpotlightBanner';
import { MapLocations } from '../SpotlightMap';

interface MapSectionHeaderProps {
  locations?: MapLocations;
  onSelectLocation: (location: SpotlightLocation) => void;
}

// TODO: this is temporary - replace with correct location handler
const createLocationOptions = (locations: MapLocations): SelectOptions => {
  let regionalContent: SelectOption[] = [];
  Object.keys(locations.regional).forEach((region) => {
    const options = locations.regional[region].map(content => ({
      label: content.name,
      value: content.geocode
    }));
    regionalContent = regionalContent.concat(options);
  });

  return regionalContent;
};

const MapSectionHeader: FunctionComponent<MapSectionHeaderProps> = props => {
  const [ options, setOptions ] = useState<SelectOptions>([]);
  useEffect(() => {
    if (props.locations) {
      setOptions(createLocationOptions(props.locations));
    }
  }, [ props.locations ]);

  const onSelectLocation = (option: SelectOption) => {
    if (option.value) {
      props.onSelectLocation({ geocode: option.value, name: option.label });
    }
  };

  return (
    <SpotlightBanner>
      <SpotlightBannerAside>
        <Select
          options={ options }
          onChange={ onSelectLocation }
          placeholder="Select Location"
          isLoading={ !props.locations }
        />
      </SpotlightBannerAside>
      <SpotlightBannerMain>
        <SpotlightBannerForm/>
      </SpotlightBannerMain>
    </SpotlightBanner>
  );
};

export { MapSectionHeader };
