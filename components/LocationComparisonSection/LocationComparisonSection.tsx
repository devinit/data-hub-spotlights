import React, { FunctionComponent, useState, ReactNode } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { Spotlight } from '../Spotlight';
import { SpotlightOptions, SpotlightTheme } from '../../utils';
import { LocationFiltersAndCharts } from './LocationFiltersAndCharts';
import { AddComparison } from './AddComparison';
import { LocationComparisonBanner } from './LocationComparisonBanner';

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

  const onCompare = (): void => {
    console.log('The locations are ' + JSON.stringify(locations));
  };

  return (
    <>
      <PageSection>
        <PageSectionHeading>Location Comparison</PageSectionHeading>
        <LocationComparisonBanner
          onCloseTag={onCloseTag}
          active={active}
          locations={locations}
          countryName={countryName}
          countryCode={countryCode}
          onWidgetClick={onWidgetClick}
          onCompare={onCompare}
        ></LocationComparisonBanner>
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
