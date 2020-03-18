import React, { FunctionComponent, useState, ReactNode } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { Spotlight } from '../Spotlight';
import { SpotlightTheme, SpotlightLocation } from '../../utils';
import { LocationFiltersAndCharts } from './LocationFiltersAndCharts';
import { AddComparison } from './AddComparison';
import { LocationComparisonBanner } from './LocationComparisonBanner';

interface LocationComparisonSectionProps {
  countryCode: string;
  countryName: string;
  themes: SpotlightTheme[];
}

export interface LocationTagProps {
  name: string;
  geocode: string;
}

export type LocationTagType = LocationTagProps[];

type NumberArray = number[];

const LocationComparisonSection: FunctionComponent<LocationComparisonSectionProps> = ({
  countryCode,
  countryName,
  themes
}) => {
  const [selectedLocations, setSelectedLocations] = useState<SpotlightLocation[]>([]);
  const [chartAndFilters, addChartAndFilters] = useState<NumberArray>([]);

  const onAddComparison = (): void => {
    addChartAndFilters([...chartAndFilters, 1]);
  };

  const renderAddComparisonComponents = (): ReactNode => {
    return chartAndFilters.map(
      (_item, index): ReactNode => {
        return (
          <PageSection key={index}>
            <Spotlight className="spotlight--full">
              <LocationFiltersAndCharts
                themes={themes}
                selectedLocations={selectedLocations}
                countryCode={countryCode}
              ></LocationFiltersAndCharts>
            </Spotlight>
          </PageSection>
        );
      }
    );
  };

  const onCompare = (locations: SpotlightLocation[] | any): void => {
    if (locations.length > 0) {
      setSelectedLocations(locations);
    }
  };

  return (
    <>
      <PageSection>
        <PageSectionHeading>Location Comparison</PageSectionHeading>
        <LocationComparisonBanner
          countryName={countryName}
          countryCode={countryCode}
          onCompare={onCompare}
        ></LocationComparisonBanner>
        <Spotlight className="spotlight--full">
          <LocationFiltersAndCharts
            themes={themes}
            selectedLocations={selectedLocations}
            countryCode={countryCode}
          ></LocationFiltersAndCharts>
        </Spotlight>
      </PageSection>
      {renderAddComparisonComponents()}
      <AddComparison onAddComparison={onAddComparison}></AddComparison>
    </>
  );
};

export { LocationComparisonSection };
