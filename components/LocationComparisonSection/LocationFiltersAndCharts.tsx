import React, { FunctionComponent, useEffect, useState } from 'react';
import { SpaceSectionBottom } from '../SpaceSectionBottom';
import { LocationComparisonFilters } from './LocationComparisonFilters';
import { VisualisationSectionMain } from '../VisualisationSection';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightIndicator, SpotlightOptions, SpotlightTheme, SpotlightLocation, getDefaults } from '../../utils';
import { LocationComparisonLineChart } from '../LocationComparisonLineChart';
import { LocationComparisonDataLoader } from '../LocationComparisonDataLoader';
import { LocationComparisonChartDataHandler } from '../LocationComparisonChartDataHandler';

interface LocationFiltersAndChartsProps {
  themes: SpotlightTheme[];
  selectedLocations: SpotlightLocation[];
  countryCode: string;
  show?: boolean;
}

const LocationFiltersAndCharts: FunctionComponent<LocationFiltersAndChartsProps> = ({
  themes,
  selectedLocations,
  countryCode,
  show = false
}) => {
  const { selected: defaultSelected } = getDefaults(themes);
  const [selections, setSelections] = useState<[SpotlightOptions] | undefined>([defaultSelected]);
  const [loading, setLoading] = useState(false);

  const onFilterChange = () => (options: SpotlightOptions): void => {
    if (options.indicator) {
      setSelections([options]);
    }
  };
  const onLoad = (): void => setLoading(false);
  useEffect(() => setLoading(true), [selectedLocations, selections]);
  return show ? (
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
            <LocationComparisonChartDataHandler
              countryCode={countryCode}
              locations={selectedLocations}
              indicators={selections?.map(sel => sel.indicator) as [SpotlightIndicator]}
            >
              <LocationComparisonLineChart height={'500px'}></LocationComparisonLineChart>
            </LocationComparisonChartDataHandler>
          </LocationComparisonDataLoader>
        </SpotlightInteractive>
      </VisualisationSectionMain>
    </>
  ) : (
    <span />
  );
};

export { LocationFiltersAndCharts };
