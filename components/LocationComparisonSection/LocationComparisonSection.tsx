import React, { FunctionComponent, useState, ReactNode } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { Spotlight } from '../Spotlight';
import { SpotlightTheme, SpotlightLocation } from '../../utils';
import { LocationFiltersAndCharts } from './LocationFiltersAndCharts';
import { AddComparison } from './AddComparison';
import { LocationComparisonBanner } from './LocationComparisonBanner';

interface ComponentProps {
  countryCode: string;
  countryName: string;
  themes: SpotlightTheme[];
}

export interface LocationTagProps {
  name: string;
  geocode: string;
}

export type LocationTagType = LocationTagProps[];

const LocationComparisonSection: FunctionComponent<ComponentProps> = ({ countryCode, countryName, themes }) => {
  const [selectedLocations, setSelectedLocations] = useState<SpotlightLocation[]>([]);
  const [chartAndFilters, addChartAndFilters] = useState<number[]>([]);
  const [showCharts, setShowCharts] = useState<boolean>(false);

  const onAddComparison = (): void => {
    if (showCharts) {
      addChartAndFilters([...chartAndFilters, 1]);
    }
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
                show={showCharts}
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
      setShowCharts(true);
    }
  };

  return (
    <>
      <PageSection>
        <PageSectionHeading>Location Comparison</PageSectionHeading>
        <LocationComparisonBanner countryName={countryName} countryCode={countryCode} onCompare={onCompare} />
        <Spotlight className="spotlight--full">
          <LocationFiltersAndCharts
            themes={themes}
            selectedLocations={selectedLocations}
            countryCode={countryCode}
            show={showCharts}
          />
        </Spotlight>
      </PageSection>
      {renderAddComparisonComponents()}
      {showCharts ? <AddComparison onAddComparison={onAddComparison}></AddComparison> : null}
    </>
  );
};

export { LocationComparisonSection };
