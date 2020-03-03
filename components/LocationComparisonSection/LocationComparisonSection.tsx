import React, { FunctionComponent, useEffect, useState, ReactNode } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerMain } from '../SpotlightBanner';
import { SpotlightMenuListItem, SpotlightMenuList, SpotlightMenu, SpotlightMenuToggle } from '../SpotlightMenu';
import SpotlightMenuNav from '../SpotlightMenu/SpotlightMenuNav';
import ugBoundaries from '../../boundaries/UG.json';
import { AddLocation } from './AddLocation';
import { Select, SelectOption, SelectOptions } from '../Select';
import { createLocationOptions, getBoundariesByCountryCode } from '../../utils';
import { LocationTagsList } from './LocationTagsList';
import { LocationTagsListItem } from './LocationTagsListItem';

interface LocationComparisonSectionProps {
  countryCode: string;
}

interface LocationTagProps {
  label: string;
}

type LocationTagType = LocationTagProps[];

const LocationComparisonSection: FunctionComponent<LocationComparisonSectionProps> = ({ countryCode }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeItem, setActiveItem] = useState('Uganda');
  const onShowMenu = (): void => setShowMenu(!showMenu);
  const onShowAll = (): void => {
    onShowMenu();
    setActiveItem('Uganda');
  };

  const [addLocation, showAddLocation] = useState(true);
  const [spotlightMenu, showSpotlightMenu] = useState(false);
  const [locationTags, setLocationTags] = useState<LocationTagType>([]);

  const toggleComponentVisibility = (menuState: boolean, addLocationState: boolean): void => {
    showAddLocation(addLocationState);
    showSpotlightMenu(menuState);
  };

  const renderMenuItems = (data: any, depth = 1, setActive: (_id: string) => void) => {
    return data.map((location: any, index: number) => {
      const onView = (_event: any, id: string) => {
        setActive(id);
        setShowMenu(false);
        toggleComponentVisibility(false, true);
        setLocationTags([
          ...locationTags,
          {
            label: id
          }
        ]);
      };

      return (
        <SpotlightMenuListItem key={index} title={location.name} depth={depth} onView={onView}>
          {location.children ? (
            <SpotlightMenuList>{renderMenuItems(location.children, depth + 1, setActive)}</SpotlightMenuList>
          ) : null}
        </SpotlightMenuListItem>
      );
    });
  };

  const renderLocationTagItems = (): ReactNode => {
    return locationTags.map((locationTag: any, index: number) => {
      return <LocationTagsListItem key={index} label={locationTag.label} />;
    });
  };

  const [options, setOptions] = useState<SelectOptions>([]);
  useEffect(() => {
    getBoundariesByCountryCode(countryCode).then(boundaries => {
      setOptions(createLocationOptions(boundaries, 'd')); // TODO: allow greater depth when sub-county data comes in
    });
  }, [countryCode]);

  const onSelectLocation = (option?: SelectOption): void => {
    if (option) {
      console.log('Select Changed ' + option.label);
      toggleComponentVisibility(false, true);
      setLocationTags([
        ...locationTags,
        {
          label: option.label
        }
      ]);
    }
  };

  return (
    <PageSection>
      <PageSectionHeading>Location Comparison</PageSectionHeading>
      <SpotlightBanner>
        <SpotlightBannerAside>
          <AddLocation
            active={addLocation}
            label={'Add Location'}
            toggleComponentVisibility={toggleComponentVisibility}
          />
          <SpotlightMenu show={spotlightMenu}>
            <SpotlightMenuToggle caption={activeItem} show={!showMenu} onClick={onShowMenu} />
            <SpotlightMenuNav caption={'Uganda'} active={showMenu} onClick={onShowMenu} onShowAll={onShowAll}>
              <SpotlightMenuList classNames="countries-menu-list__content">
                {renderMenuItems(ugBoundaries, 1, (item: string) => setActiveItem(item))}
              </SpotlightMenuList>
            </SpotlightMenuNav>
          </SpotlightMenu>
          <Select
            options={options}
            onChange={onSelectLocation}
            placeholder="Select Location"
            isLoading={!(options && options.length)}
            chooseTheme="dark"
            show={spotlightMenu}
            isClearable
          />
        </SpotlightBannerAside>
        <SpotlightBannerMain>
          <LocationTagsList>{renderLocationTagItems()}</LocationTagsList>
        </SpotlightBannerMain>
      </SpotlightBanner>
    </PageSection>
  );
};

export { LocationComparisonSection };
