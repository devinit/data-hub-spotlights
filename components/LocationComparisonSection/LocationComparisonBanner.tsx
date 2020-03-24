import React, { CSSProperties, FunctionComponent, useState } from 'react';
import { AddLocation } from '.';
import { SpotlightLocation } from '../../utils';
import { Button } from '../Button';
import { LocationSelectionBanner } from '../LocationSelectionBanner';
import { SpotlightBanner, SpotlightBannerAside } from '../SpotlightBanner';
import { TagList, TagListItem } from '../Tags';

interface ComparisonWrapperProps {
  countryName: string;
  countryCode: string;
  onCompare: (locations: SpotlightLocation[]) => void;
}

const LocationComparisonBanner: FunctionComponent<ComparisonWrapperProps> = ({
  countryName,
  countryCode,
  onCompare
}) => {
  const [active, showActive] = useState(false);
  const [locations, setLocations] = useState<SpotlightLocation[]>([]);

  const onWidgetClick = (widgetState: boolean, location: SpotlightLocation | any): void => {
    const index = locations.findIndex(x => x.name === location.name);
    showActive(widgetState);
    if (location.name && index === -1) {
      setLocations([...locations, { name: location.name, geocode: location.geocode }]);
    }
  };
  const onSelectLocation = (location?: SpotlightLocation): void => {
    if (location && locations.findIndex(_location => _location.name === location.name) === -1) {
      setLocations(locations.concat(location));
      showActive(false); // TODO: determine whether to move this outside of condition
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
    onCompare(locations);
  };

  const onCancelClick = (): void => {
    showActive(!active);
  };

  return (
    <>
      {active ? (
        <LocationSelectionBanner
          countryName={countryName}
          countryCode={countryCode}
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
            <AddLocation active={!active} label={'Add Location'} onWidgetClick={onWidgetClick} />
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
