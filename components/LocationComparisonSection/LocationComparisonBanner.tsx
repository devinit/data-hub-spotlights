import React, { CSSProperties, FunctionComponent, useState } from 'react';
import { SpotlightLocation } from '../../utils';
import { AnchorButton } from '../AnchorButton';
import { Button } from '../Button';
import { LocationSelectionBanner } from '../LocationSelectionBanner';
import { SpotlightBanner, SpotlightBannerAside } from '../SpotlightBanner';
import { TagList, TagListItem } from '../Tags';

interface ComparisonWrapperProps {
  countryName: string;
  countryCode: string;
  onCompare?: (locations: SpotlightLocation[]) => void;
}

const LocationComparisonBanner: FunctionComponent<ComparisonWrapperProps> = props => {
  const [addLocation, setAddLocation] = useState(false);
  const [locations, setLocations] = useState<SpotlightLocation[]>([]);

  const onAddLocation = (): void => setAddLocation(true);
  const onSelectLocation = (location?: SpotlightLocation): void => {
    if (location && locations.findIndex(_location => _location.name === location.name) === -1) {
      setLocations(locations.concat(location));
      setAddLocation(false); // TODO: determine whether to move this outside of condition
    }
  };

  const onCloseTag = (tagName: string): void => {
    if (locations) {
      const updatedLocations = locations.filter(function(obj) {
        return obj.name !== tagName;
      });
      setLocations([...updatedLocations]);
    }
  };

  const onClickCompare = (): void => {
    if (props.onCompare) {
      props.onCompare(locations);
    }
  };

  const onCancelClick = (): void => {
    setAddLocation(!addLocation);
  };

  return (
    <>
      {addLocation ? (
        <LocationSelectionBanner
          countryName={props.countryName}
          countryCode={props.countryCode}
          onSelectLocation={onSelectLocation}
          selectStyles={{
            container: (provided): CSSProperties => ({
              ...provided,
              maxWidth: '300px',
              fontSize: '1.6rem',
              width: '100%'
            })
          }}
        >
          <Button className="countries__searched-cancel" onClick={onCancelClick}>
            <span>Cancel</span>
          </Button>
        </LocationSelectionBanner>
      ) : (
        <SpotlightBanner>
          <SpotlightBannerAside>
            <AnchorButton className="m-text-link add-location-link" onClick={onAddLocation}>
              <i role="presentation" aria-hidden="true" className="ico ico--16 ico-plus-poppy"></i>
              <span>Add Location</span>
            </AnchorButton>
          </SpotlightBannerAside>
        </SpotlightBanner>
      )}
      {locations.length ? (
        <SpotlightBanner>
          <TagList>
            {locations.map(location => (
              <TagListItem key={location.geocode} label={location.name} onRemove={onCloseTag} />
            ))}
          </TagList>
          {locations.length >= 2 ? (
            <Button className="button button--compare" onClick={onClickCompare}>
              Compare
            </Button>
          ) : null}
        </SpotlightBanner>
      ) : null}
    </>
  );
};

export { LocationComparisonBanner };
