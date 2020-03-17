import React, { FunctionComponent, useEffect, useState } from 'react';
import { SpaceSectionBottom } from '../SpaceSectionBottom';
import { LocationComparisonFilters } from './LocationComparisonFilters';
import { VisualisationSectionMain } from '../VisualisationSection';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightOptions, SpotlightTheme, SpotlightLocation } from '../../utils';
import { LocationComparisonLineChart } from '../LocationComparisonLineChart';
import { LocationComparisonDataLoader } from '../LocationComparisonDataLoader';

interface LocationFiltersAndChartsProps {
  themes: SpotlightTheme[];
  selectedLocations: SpotlightLocation[];
}

const LocationFiltersAndCharts: FunctionComponent<LocationFiltersAndChartsProps> = ({ themes, selectedLocations }) => {
  const [selections, setSelections] = useState<[SpotlightOptions] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const onFilterChange = () => (options: SpotlightOptions): void => {
    if (options.indicator) {
      setSelections([options]);
    }
  };
  const onLoad = (): void => setLoading(false);
  useEffect(() => setLoading(true), [selectedLocations, selections]);

  return (
    <>
      <SpaceSectionBottom>
        <LocationComparisonFilters
          themes={themes}
          onOptionsChange={onFilterChange()}
          topicLabel="Select a topic to explore"
          indicatorLabel="Choose an indicator"
          topicClassName="form-field--inline-three"
          indicatorClassName="form-field--inline-three"
          yearClassName="form-field--inline-three"
        ></LocationComparisonFilters>
      </SpaceSectionBottom>
      <VisualisationSectionMain>
        <SpotlightInteractive>
          <LocationComparisonDataLoader
            options={selections}
            onLoad={onLoad}
            loading={loading}
            locations={selectedLocations}
          >
            <LocationComparisonLineChart height={'500px'}></LocationComparisonLineChart>
          </LocationComparisonDataLoader>
        </SpotlightInteractive>
      </VisualisationSectionMain>
    </>
  );
};

export { LocationFiltersAndCharts };
