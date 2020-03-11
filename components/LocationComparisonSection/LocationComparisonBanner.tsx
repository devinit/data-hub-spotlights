import React, { FunctionComponent } from 'react';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerMain } from '../SpotlightBanner';
import { AddLocation } from '.';
import { SpotlightMenuWithData } from '../SpotlightMenuWithData';
import { SelectWithData } from '../SelectWithData';
import { Tags } from '../Tags/Tags';
import { Button } from '../Button';
import { SelectOption } from '../Select';
import { SpotlightLocation } from '../../utils';

interface ComparisonWrapperProps {
  countryName: string;
  countryCode: string;
  onWidgetClick: (widgetState: boolean, locationName: SelectOption | any | string) => void;
  active: boolean;
  locations: SpotlightLocation[];
  onCloseTag: (tagName: string) => void;
  onCompare: () => void;
}

const LocationComparisonBanner: FunctionComponent<ComparisonWrapperProps> = ({
  countryName,
  countryCode,
  onWidgetClick,
  active,
  locations,
  onCloseTag,
  onCompare
}) => {
  const onClickCompare = (): void => {
    onCompare();
  };

  return (
    <SpotlightBanner>
      <SpotlightBannerAside>
        <AddLocation active={!active} label={'Add Location'} onWidgetClick={onWidgetClick} />
        <SpotlightMenuWithData
          onWidgetClick={onWidgetClick}
          countryName={countryName}
          countryCode={countryCode}
          spotlightMenu={active}
        />
        <SelectWithData show={active} countryCode={countryCode} onWidgetClick={onWidgetClick} />
      </SpotlightBannerAside>
      <SpotlightBannerMain>
        <Tags onCloseTag={onCloseTag} updatedTags={locations} />
        <Button className={'button--compare'} onButtonClick={onClickCompare}>
          {'Compare'}
        </Button>
      </SpotlightBannerMain>
    </SpotlightBanner>
  );
};

export { LocationComparisonBanner };
