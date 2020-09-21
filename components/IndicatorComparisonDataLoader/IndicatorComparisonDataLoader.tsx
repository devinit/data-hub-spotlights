import React, { Children, cloneElement, FunctionComponent, isValidElement, useEffect, useState } from 'react';
import {
  getLocationGeoCodes,
  SpotlightIndicator,
  SpotlightLocation,
  SpotlightOptions,
  useBoundaries,
  useBoundaryDepthContext,
  LocationIndicatorData,
} from '../../utils';
import { alignDataToBoundaries, useDDWData } from '../DDWDataLoader';
import { parseIndicator } from '../MapSection/utils';

interface ComponentProps {
  options: [SpotlightOptions, SpotlightOptions];
  location?: SpotlightLocation;
  loading?: boolean;
}
const getMinIndicatorYear = (indicators: SpotlightIndicator[]): number => {
  const years = indicators.reduce<number[]>((prev, indicator) => {
    if (indicator.start_year && prev.indexOf(indicator.start_year) === -1) {
      prev.push(indicator.start_year);
    }
    if (indicator.end_year && prev.indexOf(indicator.end_year) === -1) {
      prev.push(indicator.end_year);
    }

    return prev;
  }, []);

  return Math.min(...years);
};

const IndicatorComparisonDataLoader: FunctionComponent<ComponentProps> = ({ options: selectOptions, ...props }) => {
  const boundaries = useBoundaries(useBoundaryDepthContext());
  const indicators = selectOptions.map((option) => parseIndicator(option.indicator as SpotlightIndicator) as string);
  const geocodes = props.location ? getLocationGeoCodes(boundaries[1], props.location) : [];
  const filter = [selectOptions.map((option) => ({ field: 'year', operator: '=', value: `${option.year}` }))];
  const [processedData, setProcessedData] = useState<LocationIndicatorData[]>([]);
  const { data, dataLoading, setOptions } = useDDWData({
    boundaries: boundaries[1],
    indicators,
    geocodes,
    filter,
    limit: 1000,
  });
  useEffect(() => {
    setOptions({ boundaries: boundaries[1], indicators, geocodes, filter });
  }, [props.location, selectOptions]);
  useEffect(() => {
    if (!dataLoading && data && boundaries) {
      setProcessedData(
        alignDataToBoundaries(
          data.map((d) => {
            // filter data to remove irrelevant years for indicator
            if (d.data.length) {
              const option = selectOptions.find((o) => o.indicator?.ddw_id.includes(d.indicator));
              const filteredData = d.data.filter((item) => item.year === option?.year);

              return { ...d, data: filteredData };
            }

            return d;
          }),
          boundaries[1],
          getMinIndicatorYear(selectOptions.map((option) => option.indicator) as SpotlightIndicator[])
        )
      );
    }
  }, [data]);

  return (
    <>
      {Children.map(props.children, (child) =>
        isValidElement(child) ? cloneElement(child, { data: processedData, dataLoading }) : null
      )}
    </>
  );
};

export { IndicatorComparisonDataLoader };
