import React, { FunctionComponent, useState, ReactNode } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightBanner, SpotlightBannerAside, SpotlightBannerMain } from '../SpotlightBanner';
import { AddLocation } from './AddLocation';
import { Button } from '../Button';
import { SelectWithData } from '../SelectWithData';
import { SpotlightMenuWithData } from '../SpotlightMenuWithData';
import { Tags } from '../Tags/Tags';
import { Spotlight } from '../Spotlight';
import { SpotlightOptions, SpotlightTheme } from '../../utils';
import { LocationFiltersAndCharts } from './LocationFiltersAndCharts';
import { AddComparison } from './AddComparison';

interface LocationComparisonSectionProps {
  countryCode: string;
  countryName: string;
  themes: SpotlightTheme[];
}

export interface LocationTagProps {
  label: string;
}

export type LocationTagType = LocationTagProps[];

type NumberArray = number[];

const LocationComparisonSection: FunctionComponent<LocationComparisonSectionProps> = ({
  countryCode,
  countryName,
  themes
}) => {
  const [active, showActive] = useState(false);
  const [locations, setLocations] = useState<LocationTagType>([]);
  const [filter, setFilter] = useState<SpotlightOptions | undefined>(undefined);
  const [chartAndFilters, addChartAndFilters] = useState<NumberArray>([]);

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

  const onAddComparison = (): void => {
    addChartAndFilters([...chartAndFilters, 1]);
  };

  const renderAddComparisonComponents = (): ReactNode => {
    return chartAndFilters.map(
      (_item, index): ReactNode => {
        return (
          <PageSection key={index}>
            <Spotlight className="spotlight--full">
              <LocationFiltersAndCharts themes={themes} onFilterChange={onFilterChange}></LocationFiltersAndCharts>
            </Spotlight>
          </PageSection>
        );
      }
    );
  };

  return (
    <>
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
          <LocationFiltersAndCharts themes={themes} onFilterChange={onFilterChange}></LocationFiltersAndCharts>
        </Spotlight>
      </PageSection>
      {renderAddComparisonComponents()}
      <AddComparison onAddComparison={onAddComparison}></AddComparison>
    </>
  );
};

export { LocationComparisonSection };
