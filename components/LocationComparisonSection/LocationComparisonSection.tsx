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
  const [chartCount, setChartCount] = useState<number>(0);

  const onAddComparison = (): void => {
    setChartCount(chartCount + 1);
  };

  const renderSections = (): ReactNode => {
    const sections = [];
    for (let index = 0; index < chartCount; index++) {
      sections.push(
        <PageSection key={index}>
          <Spotlight className="spotlight--full">
            <LocationFiltersAndCharts themes={themes} selectedLocations={selectedLocations} countryCode={countryCode} />
          </Spotlight>
        </PageSection>
      );
    }

    return sections;
  };

  const onCompare = (locations: SpotlightLocation[]): void => {
    setSelectedLocations(locations);
    if (!chartCount) {
      setChartCount(1);
    }
  };

  return (
    <>
      <PageSection>
        <PageSectionHeading>Location Comparison</PageSectionHeading>
        <LocationComparisonBanner countryName={countryName} countryCode={countryCode} onCompare={onCompare} />
      </PageSection>
      {renderSections()}
      {chartCount ? <AddComparison onAddComparison={onAddComparison}></AddComparison> : null}
    </>
  );
};

export { LocationComparisonSection };
