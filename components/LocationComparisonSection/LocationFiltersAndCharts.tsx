import React, { FunctionComponent, useState } from 'react';
import { SpaceSectionBottom } from '../SpaceSectionBottom';
import { LocationComparisonFilters } from './LocationComparisonFilters';
import { VisualisationSectionMain } from '../VisualisationSection';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightOptions, SpotlightTheme, SpotlightLocation } from '../../utils';
import { LocationComparisonLineChart } from '../LocationComparisonLineChart';

interface LocationFiltersAndChartsProps {
  themes: SpotlightTheme[];
  selectedLocations: SpotlightLocation[];
}

const LocationFiltersAndCharts: FunctionComponent<LocationFiltersAndChartsProps> = ({ themes, selectedLocations }) => {
  const [selections, setSelections] = useState<[SpotlightOptions] | undefined>(undefined);
  //const [loading, setLoading] = useState(false);

  const onFilterChange = () => (options: SpotlightOptions): void => {
    console.log('Filter change ' + JSON.stringify(selections) + ' ' + JSON.stringify(selectedLocations));
    if (options.indicator) {
      setSelections([options]);
    }
  };
  //const onLoad = (): void => setLoading(false);

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
          <LocationComparisonLineChart height={'500px'}></LocationComparisonLineChart>
        </SpotlightInteractive>
      </VisualisationSectionMain>
    </>
  );
};

export { LocationFiltersAndCharts };
