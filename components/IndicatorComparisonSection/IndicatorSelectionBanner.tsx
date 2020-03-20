import React, { FunctionComponent, useState, useEffect } from 'react';
import { SpotlightOptions, SpotlightTheme, getDefaultsByIndex } from '../../utils';
import { SpotlightBanner } from '../SpotlightBanner';
import { SpotlightComparison } from '../SpotlightComparison';
import { SpotlightFilters } from '../SpotlightFilters';

interface ComparisonWrapperProps {
  themes: SpotlightTheme[];
  compareOnLoad?: boolean;
  onCompare: (indicators: [SpotlightOptions, SpotlightOptions]) => void;
}

const DEFAULT_INDEXES: [number, number] = [1, 2];

const IndicatorSelectionBanner: FunctionComponent<ComparisonWrapperProps> = ({ themes, onCompare, ...props }) => {
  const [filterOne, setFilterOne] = useState<SpotlightOptions | undefined>(undefined);
  const [filterTwo, setFilterTwo] = useState<SpotlightOptions | undefined>(undefined);
  useEffect(() => {
    if (props.compareOnLoad) {
      onCompare([getDefaultsByIndex(themes).selected, getDefaultsByIndex(themes, DEFAULT_INDEXES).selected]);
    }
  }, []);
  const onFilterChange = (index: number) => (options: SpotlightOptions): void => {
    if (options.indicator && options.year) {
      if (index === 0) {
        setFilterOne(options);
      } else {
        setFilterTwo(options);
      }
    }
  };
  const onClickCompare = (): void => {
    if (filterOne && filterTwo) {
      onCompare([filterOne, filterTwo]);
    }
  };

  return (
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
          defaultIndexes={DEFAULT_INDEXES}
        />
      </SpotlightComparison>
      <button
        type="submit"
        className="button button--compare"
        onClick={onClickCompare}
        disabled={!filterOne || !filterTwo}
      >
        Compare
      </button>
    </SpotlightBanner>
  );
};

export { IndicatorSelectionBanner };
