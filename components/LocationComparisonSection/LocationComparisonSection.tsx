import React, { FunctionComponent, useState } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerMain } from '../SpotlightBanner';
import { AddLocation } from './AddLocation';
import { Button } from '../Button';
import { SelectWithData } from '../SelectWithData';
import { SpotlightMenuWithData } from '../SpotlightMenuWithData';
import { Tags } from '../Tags/Tags';
import { Spotlight } from '../Spotlight';
import { SpaceSectionBottom } from '../SpaceSectionBottom';
import { LocationComparisonFilters } from './LocationComparisonFilters';
import { SpotlightOptions, SpotlightTheme } from '../../utils';
import { VisualisationSectionMain } from '../VisualisationSection';
import { SpotlightInteractive } from '../SpotlightInteractive';

interface LocationComparisonSectionProps {
  countryCode: string;
  countryName: string;
  themes: SpotlightTheme[];
}

export interface LocationTagProps {
  label: string;
}

export type LocationTagType = LocationTagProps[];

const LocationComparisonSection: FunctionComponent<LocationComparisonSectionProps> = ({
  countryCode,
  countryName,
  themes
}) => {
  const [active, showActive] = useState(false);
  const [locations, setLocations] = useState<LocationTagType>([]);
  const [filter, setFilter] = useState<SpotlightOptions | undefined>(undefined);

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
  const onFilterChange = (index: number) => (options: SpotlightOptions): void => {
    console.log('filter is ' + filter + ' and number is ' + index);
    if (options.indicator && options.year) {
      setFilter(options);
    }
  };

  return (
    <PageSection>
      <PageSectionHeading>Location Comparison</PageSectionHeading>
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
          <Button className={'button--compare'}>{'Compare'}</Button>
        </SpotlightBannerMain>
      </SpotlightBanner>
      <Spotlight className="spotlight--full">
        <SpaceSectionBottom>
          <LocationComparisonFilters
            themes={themes}
            onOptionsChange={onFilterChange(0)}
            topicLabel="Select a topic to explore"
            indicatorLabel="Choose an indicator"
            topicClassName="form-field--inline-three"
            indicatorClassName="form-field--inline-three"
            yearClassName="form-field--inline-three"
          ></LocationComparisonFilters>
        </SpaceSectionBottom>
        <VisualisationSectionMain>
          <SpotlightInteractive></SpotlightInteractive>
        </VisualisationSectionMain>
      </Spotlight>
    </PageSection>
  );
};

export { LocationComparisonSection };
