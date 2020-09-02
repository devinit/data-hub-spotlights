import classNames from 'classnames';
import { CSSProperties, default as React, FunctionComponent, useEffect, useState } from 'react';
import { SpotlightLocation, useBoundaries, useBoundaryDepthContext } from '../../utils';
import { Button } from '../Button';
import { LocationSelectionBanner } from '../LocationSelectionBanner';
import { SpotlightBanner } from '../SpotlightBanner';
import { TagList, TagListItem } from '../Tags';

interface ComparisonWrapperProps {
  onCompare?: (locations: SpotlightLocation[]) => void;
  locations?: SpotlightLocation[];
}

const LocationComparisonBanner: FunctionComponent<ComparisonWrapperProps> = (props) => {
  const [boundaries] = useBoundaries(useBoundaryDepthContext());
  const [locations, setLocations] = useState<SpotlightLocation[]>(props.locations ? props.locations : []);
  useEffect(() => {
    if (locations.length < 2 && props.onCompare) {
      props.onCompare(locations);
    }
  }, [locations]);

  const onSelectLocation = (location?: SpotlightLocation): void => {
    if (
      location &&
      locations.findIndex((_location) => _location.name.toLowerCase() === location.name.toLowerCase()) === -1
    ) {
      const updatedLocations = locations.concat(location);
      setLocations(updatedLocations);
    }
  };
  const onCloseTag = (tagName: string): void => {
    const updatedLocations = locations.filter((location) => location.name.toLowerCase() !== tagName.toLowerCase());
    setLocations(updatedLocations);
  };
  const onClickCompare = (): void => {
    if (props.onCompare) {
      props.onCompare(locations);
    }
  };

  return (
    <>
      <LocationSelectionBanner
        boundaries={boundaries}
        onSelectLocation={onSelectLocation}
        selectStyles={{
          container: (provided): CSSProperties => ({
            ...provided,
            maxWidth: '300px',
            fontSize: '1.6rem',
            width: '100%',
          }),
        }}
        heading="Add Location"
        canReset={false}
      />
      {locations.length ? (
        <SpotlightBanner>
          <TagList>
            {locations.map((location) => (
              <TagListItem key={location.geocode} label={location.name} onRemove={onCloseTag} />
            ))}
          </TagList>
          <Button
            className={classNames('button button--compare', { 'button--disabled': locations.length < 2 })}
            onClick={onClickCompare}
          >
            Compare
          </Button>
        </SpotlightBanner>
      ) : null}
    </>
  );
};

export { LocationComparisonBanner };
