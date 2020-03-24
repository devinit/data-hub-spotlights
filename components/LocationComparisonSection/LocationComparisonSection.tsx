import React, { FunctionComponent, ReactNode, useState } from 'react';
import { SpotlightLocation, SpotlightTheme } from '../../utils';
import { ButtonBanner } from '../ButtonBanner';
import { PageSection, PageSectionHeading } from '../PageSection';
import { Spotlight } from '../Spotlight';
import { LocationComparisonBanner } from './LocationComparisonBanner';
import { LocationFiltersAndCharts } from './LocationFiltersAndCharts';

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
      {chartCount ? (
        <PageSection>
          <ButtonBanner onClick={onAddComparison} className="m-text-link add-location-link">
            <i role="presentation" aria-hidden="true" className="ico ico--16 ico-plus-poppy"></i>
            <span>Add another comparison</span>
          </ButtonBanner>
        </PageSection>
      ) : null}
    </>
  );
};

export { LocationComparisonSection };
