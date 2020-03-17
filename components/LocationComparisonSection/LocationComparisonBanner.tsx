import React, { FunctionComponent, useState } from 'react';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerMain } from '../SpotlightBanner';
import { AddLocation } from '.';
import { SpotlightMenuWithData } from '../SpotlightMenuWithData';
import { SelectWithData } from '../SelectWithData';
import { Tags } from '../Tags/Tags';
import { Button } from '../Button';
import { SpotlightLocation } from '../../utils';

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
    showActive(widgetState);
    location.name ? setLocations([...locations, { name: location.name, geocode: location.geocode }]) : null;
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

  return (
    <>
      <SpotlightBanner>
        <SpotlightBannerAside>
          <AddLocation active={!active} label={'Add Location'} onWidgetClick={onWidgetClick} />
          <SpotlightMenuWithData
            onWidgetClick={onWidgetClick}
            countryName={countryName}
            countryCode={countryCode}
            spotlightMenu={active}
          />
        </SpotlightBannerAside>
        <SpotlightBannerMain>
          <SelectWithData show={active} countryCode={countryCode} onWidgetClick={onWidgetClick} />
        </SpotlightBannerMain>
      </SpotlightBanner>
      <SpotlightBanner>
        <Tags onCloseTag={onCloseTag} updatedTags={locations} />
        <Button className={'button--compare'} onButtonClick={onClickCompare}>
          {'Compare'}
        </Button>
      </SpotlightBanner>
    </>
  );
};

export { LocationComparisonBanner };
