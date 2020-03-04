import React, { FunctionComponent, useState } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerMain } from '../SpotlightBanner';
import { AddLocation } from './AddLocation';
import { Button } from '../Button';
import { SelectWithData } from '../SelectWithData';
import { SpotlightMenuWithData } from '../SpotlightMenuWithData';
import { Tags } from '../Tags/Tags';

interface LocationComparisonSectionProps {
  countryCode: string;
  countryName: string;
}

export interface LocationTagProps {
  label: string;
}

export type LocationTagType = LocationTagProps[];

const LocationComparisonSection: FunctionComponent<LocationComparisonSectionProps> = ({ countryCode, countryName }) => {
  const [active, showActive] = useState(false);
  const [locations, setLocations] = useState<LocationTagType>([]);

  const onWidgetClick = (widgetState: boolean, locationName: string): void => {
    showActive(widgetState);
    locationName.length > 0 ? setLocations([...locations, { label: locationName }]) : null;
  };

  const onCloseTag = (tagName: string): void => {
    const updatedLocations = locations.filter(function(obj) {
      return obj.label !== tagName;
    });
    setLocations([...updatedLocations]);
  };

  return (
    <PageSection>
      <PageSectionHeading>Location Comparison</PageSectionHeading>
      <SpotlightBanner>
        <SpotlightBannerAside>
          <AddLocation active={!active} label={'Add Location'} onWidgetClick={onWidgetClick} />
          <SpotlightMenuWithData onWidgetClick={onWidgetClick} countryName={countryName} spotlightMenu={active} />
          <SelectWithData show={active} countryCode={countryCode} onWidgetClick={onWidgetClick} />
        </SpotlightBannerAside>
        <SpotlightBannerMain>
          <Tags onCloseTag={onCloseTag} updatedTags={locations} />
          <Button className={'button--compare'}>{'Compare'}</Button>
        </SpotlightBannerMain>
      </SpotlightBanner>
    </PageSection>
  );
};

export { LocationComparisonSection };
