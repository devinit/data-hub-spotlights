import React, { FunctionComponent, useState } from 'react';
import { PageSection, PageSectionHeading } from '../PageSection';
import { SpotlightLocation, SpotlightTheme, SpotlightOptions, SpotlightIndicator } from '../../utils';
import { SpotlightComparison } from '../SpotlightComparison';
import { SpotlightFilters } from '../SpotlightFilters';
import { SpotlightBanner } from '../SpotlightBanner';
import { VisualisationSection, VisualisationSectionMain } from '../VisualisationSection';
import { SpotlightSidebar } from '../SpotlightSidebar';
import { SpotlightHeading } from '../SpotlightHeading';
import { SpotlightInteractive } from '../SpotlightInteractive';

export interface IndicatorComparisonSectionProps {
  location?: SpotlightLocation;
  themes: SpotlightTheme[];
  countryCode: string;
  countryName: string;
}

const IndicatorComparisonSection: FunctionComponent<IndicatorComparisonSectionProps> = props => {
  const { location, themes, countryName } = props;
  const [indicatorOne, setIndicatorOne] = useState<SpotlightIndicator | undefined>(undefined);
  const [indicatorTwo, setIndicatorTwo] = useState<SpotlightIndicator | undefined>(undefined);
  const onFilterChange = (index: number) => (options: SpotlightOptions): void => {
    if (options.indicator) {
      if (index === 0) {
        setIndicatorOne(options.indicator);
      } else {
        setIndicatorTwo(options.indicator);
      }
    }
  };
  console.log(indicatorOne, indicatorTwo);

  return (
    <PageSection wide dark={!location}>
      <PageSectionHeading>Compare indicators for {location ? location.name : countryName}</PageSectionHeading>
      <SpotlightBanner>
        <SpotlightComparison>
          <SpotlightFilters
            themes={themes}
            onOptionsChange={onFilterChange(0)}
            topicLabel="Topic"
            indicatorLabel="Indicator"
            yearLabel="Year"
            topicClassName="form-field--inline-three"
            indicatorClassName="form-field--inline-three"
            yearClassName="form-field--inline-three"
          />
        </SpotlightComparison>
        <SpotlightComparison legendClassName="spotlight__comparison-legend--alt">
          <SpotlightFilters
            themes={themes}
            onOptionsChange={onFilterChange(1)}
            topicLabel="Topic"
            indicatorLabel="Indicator"
            yearLabel="Year"
            topicClassName="form-field--inline-three"
            indicatorClassName="form-field--inline-three"
            yearClassName="form-field--inline-three"
          />
        </SpotlightComparison>
        <button type="submit" className="button button--compare">
          Compare
        </button>
      </SpotlightBanner>

      <VisualisationSection className="spotlight--leader">
        <SpotlightSidebar>
          <SpotlightHeading>{location ? location.name : countryName}</SpotlightHeading>
          <SpotlightInteractive></SpotlightInteractive>
        </SpotlightSidebar>
        <VisualisationSectionMain>
          <SpotlightHeading>Locations in {location ? location.name : countryName}</SpotlightHeading>
          <SpotlightInteractive maxHeight="500px"></SpotlightInteractive>
        </VisualisationSectionMain>
      </VisualisationSection>
    </PageSection>
  );
};

export { IndicatorComparisonSection };
