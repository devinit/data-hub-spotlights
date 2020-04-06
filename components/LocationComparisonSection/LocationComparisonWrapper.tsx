import React, { FunctionComponent, useEffect, useState } from 'react';
import { getDefaultsByIndex, SpotlightLocation, SpotlightOptions, SpotlightTheme } from '../../utils';
import { LocationComparisonChartDataHandler } from '../LocationComparisonChartDataHandler';
import { LocationComparisonDataLoader } from '../LocationComparisonDataLoader';
import { SpaceSectionBottom } from '../SpaceSectionBottom';
import { SpotlightFilters } from '../SpotlightFilters';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { VisualisationSectionMain } from '../VisualisationSection';
import { setQuery } from '../MapSection/utils';
import { useRouter } from 'next/router';

interface ComponentProps {
  themes: SpotlightTheme[];
  locations: SpotlightLocation[];
  countryCode: string;
}

const LocationComparisonWrapper: FunctionComponent<ComponentProps> = ({ themes, locations, countryCode }) => {
  const router = useRouter();
  const { selected: defaultSelected } = getDefaultsByIndex(themes);
  const [selections, setSelections] = useState<SpotlightOptions>(defaultSelected);
  const [loading, setLoading] = useState(false);
  useEffect(() => setLoading(true), [locations, selections]);
  useEffect(() => {
    const initialSelectedLocation = localStorage.getItem('initialSelectedLocation');
    if (initialSelectedLocation && initialSelectedLocation.length > 0) {
      setQuery(router, selections, JSON.parse(initialSelectedLocation.toString()));
    }
  }, []);

  const onFilterChange = () => (options: SpotlightOptions): void => {
    if (options.indicator) {
      setSelections(options);
    }
  };
  const onLoad = (): void => setLoading(false);

  return (
    <>
      <SpaceSectionBottom>
        <SpotlightFilters
          themes={themes}
          onOptionsChange={onFilterChange()}
          topicLabel="Select a topic to explore"
          indicatorLabel="Choose an indicator"
          topicClassName="form-field--inline-three"
          indicatorClassName="form-field--inline-three"
          yearClassName="hide"
        />
      </SpaceSectionBottom>
      {selections.indicator ? (
        <VisualisationSectionMain>
          <SpotlightInteractive background="#ffffff">
            <LocationComparisonDataLoader options={selections} onLoad={onLoad} loading={loading} locations={locations}>
              <LocationComparisonChartDataHandler
                countryCode={countryCode}
                locations={locations}
                indicator={selections.indicator}
              />
            </LocationComparisonDataLoader>
          </SpotlightInteractive>
        </VisualisationSectionMain>
      ) : null}
    </>
  );
};

export { LocationComparisonWrapper };
