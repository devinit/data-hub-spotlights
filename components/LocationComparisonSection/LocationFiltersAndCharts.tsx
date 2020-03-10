import React, { FunctionComponent } from 'react';
import { SpaceSectionBottom } from '../SpaceSectionBottom';
import { LocationComparisonFilters } from './LocationComparisonFilters';
import { VisualisationSectionMain } from '../VisualisationSection';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightOptions, SpotlightTheme } from '../../utils';
import { LocationComparisonLineChart } from '../LocationComparisonLineChart';

interface LocationFiltersAndChartsProps {
  onFilterChange: (index: number) => (options: SpotlightOptions) => void;
  themes: SpotlightTheme[];
}

const LocationFiltersAndCharts: FunctionComponent<LocationFiltersAndChartsProps> = ({ themes, onFilterChange }) => {
  return (
    <>
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
        <SpotlightInteractive>
          <LocationComparisonLineChart height={'500px'}></LocationComparisonLineChart>
        </SpotlightInteractive>
      </VisualisationSectionMain>
    </>
  );
};

export { LocationFiltersAndCharts };
