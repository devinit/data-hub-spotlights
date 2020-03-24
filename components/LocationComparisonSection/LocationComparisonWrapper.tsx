import React, { FunctionComponent, useEffect, useState } from 'react';
import { getDefaults, SpotlightIndicator, SpotlightLocation, SpotlightOptions, SpotlightTheme } from '../../utils';
import { LocationComparisonChartDataHandler } from '../LocationComparisonChartDataHandler';
import { LocationComparisonDataLoader } from '../LocationComparisonDataLoader';
import { LocationComparisonLineChart } from '../LocationComparisonLineChart';
import { SpaceSectionBottom } from '../SpaceSectionBottom';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { VisualisationSectionMain } from '../VisualisationSection';
import { LocationComparisonFilters } from './LocationComparisonFilters';

interface ComponentProps {
  themes: SpotlightTheme[];
  locations: SpotlightLocation[];
  countryCode: string;
}

const LocationComparisonWrapper: FunctionComponent<ComponentProps> = ({ themes, locations, countryCode }) => {
  const { selected: defaultSelected } = getDefaults(themes);
  const [selections, setSelections] = useState<[SpotlightOptions] | undefined>([defaultSelected]);
  const [loading, setLoading] = useState(false);

  const onFilterChange = () => (options: SpotlightOptions): void => {
    if (options.indicator) {
      setSelections([options]);
    }
  };
  const onLoad = (): void => setLoading(false);
  useEffect(() => setLoading(true), [locations, selections]);
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
          <LocationComparisonDataLoader options={selections} onLoad={onLoad} loading={loading} locations={locations}>
            <LocationComparisonChartDataHandler
              countryCode={countryCode}
              locations={locations}
              indicators={selections?.map(sel => sel.indicator) as [SpotlightIndicator]}
            >
              <LocationComparisonLineChart height={'500px'}></LocationComparisonLineChart>
            </LocationComparisonChartDataHandler>
          </LocationComparisonDataLoader>
        </SpotlightInteractive>
      </VisualisationSectionMain>
    </>
  );
};

export { LocationComparisonWrapper };
