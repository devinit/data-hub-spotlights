import React, { FunctionComponent, useEffect, useState } from 'react';
import { getDefaultsByIndex, SpotlightLocation, SpotlightOptions, SpotlightTheme } from '../../utils';
import { Button } from '../Button';
import { FormField } from '../FormField';
import { Icon } from '../Icon';
import { LocationComparisonChartDataHandler } from '../LocationComparisonChartDataHandler';
import { setQuery } from '../MapSection/utils';
import { PageSection } from '../PageSection';
import { Spotlight } from '../Spotlight';
import { SpotlightBanner } from '../SpotlightBanner';
import { SpotlightFilters } from '../SpotlightFilters';
import { VisualisationSectionMain } from '../VisualisationSection';
import { addEvent } from '../../utils/analytics';

interface ComponentProps {
  themes: SpotlightTheme[];
  locations: SpotlightLocation[];
  onRemove?: () => void;
}

const LocationComparisonChartSection: FunctionComponent<ComponentProps> = (props) => {
  const { selected: defaultSelected } = getDefaultsByIndex(props.themes);
  const [selections, setSelections] = useState<SpotlightOptions>(defaultSelected);
  useEffect(() => {
    setQuery(selections, props.locations);
  }, [props.locations]);

  const onFilterChanged = (options: SpotlightOptions): void => {
    if (options.indicator) {
      setSelections(options);
      setQuery(options, props.locations);
      addEvent('locationComparisonOptionsChanged', {
        topic: options.theme?.name,
        indicator: options.indicator.name,
      });
    }
  };

  return (
    <PageSection narrow>
      <Spotlight className="spotlight--full">
        <SpotlightBanner>
          <SpotlightFilters
            themes={props.themes}
            onOptionsChange={onFilterChanged}
            topicLabel="Select a topic to explore"
            indicatorLabel="Choose an indicator"
            topicClassName="form-field--inline-three"
            indicatorClassName="form-field--inline-three"
            yearClassName="hide"
          >
            {props.onRemove ? (
              <FormField className="form-field--inline-three">
                <Button className="button button--alt button--icon-l" onClick={props.onRemove}>
                  <Icon name="-20 ico-cross-slate" />
                  Remove chart
                </Button>
              </FormField>
            ) : null}
          </SpotlightFilters>
        </SpotlightBanner>
        {selections.indicator ? (
          <VisualisationSectionMain>
            <LocationComparisonChartDataHandler locations={props.locations} indicator={selections.indicator} />
          </VisualisationSectionMain>
        ) : null}
      </Spotlight>
    </PageSection>
  );
};

export default LocationComparisonChartSection;
