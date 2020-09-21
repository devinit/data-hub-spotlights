import React, { Children, cloneElement, FunctionComponent, isValidElement, useEffect } from 'react';
import {
  SpotlightIndicator,
  SpotlightLocation,
  SpotlightOptions,
  useBoundaries,
  useBoundaryDepthContext,
} from '../../utils';
import { useDDWData } from '../DDWDataLoader';
import { parseIndicator } from '../MapSection/utils';

interface ComponentProps {
  options: [SpotlightOptions, SpotlightOptions];
  locations: SpotlightLocation[];
  loading?: boolean;
}

const IndicatorComparisonDataLoader: FunctionComponent<ComponentProps> = ({ options: selectOptions, ...props }) => {
  const boundaries = useBoundaries(useBoundaryDepthContext());
  const indicators = selectOptions.map((option) => parseIndicator(option.indicator as SpotlightIndicator) as string);
  const geocodes = props.locations.map((location) => location.geocode);
  const filter = [selectOptions.map((option) => ({ field: 'year', operator: '=', value: `${option.year}` }))];
  const { data, dataLoading, setOptions } = useDDWData({
    boundaries: boundaries[1],
    indicators,
    geocodes,
    filter,
    limit: 1000,
  });
  useEffect(() => {
    setOptions({ boundaries: boundaries[1], indicators, geocodes, filter });
  }, [props.locations, selectOptions]);

  return (
    <>
      {Children.map(props.children, (child) =>
        isValidElement(child) ? cloneElement(child, { data, dataLoading }) : null
      )}
    </>
  );
};

export { IndicatorComparisonDataLoader };
