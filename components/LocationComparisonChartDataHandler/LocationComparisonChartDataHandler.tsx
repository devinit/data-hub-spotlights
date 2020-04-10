import React, { FunctionComponent } from 'react';
import { LocationIndicatorData, SpotlightLocation, LocationData, SpotlightIndicator } from '../../utils';
import { LocationComparisonLineChart } from '../LocationComparisonLineChart';
import { groupBy } from 'underscore';

interface ComponentProps {
  data?: LocationIndicatorData;
  indicator: SpotlightIndicator;
  locations: SpotlightLocation[];
  countryCode: string;
}

const getYears = (data: LocationData[]): number[] =>
  data.reduce((prev: number[], curr) => (prev.indexOf(curr.year) === -1 ? prev.concat(curr.year) : prev), []).sort();

const LocationComparisonChartDataHandler: FunctionComponent<ComponentProps> = ({ data, indicator }) => {
  const valueOptions = {
    dataFormat: indicator.data_format,
    prefix: indicator.value_prefix,
    suffix: indicator.value_suffix
  };

  if (!data) {
    return <LocationComparisonLineChart years={[]} data={{}} height={'500px'} valueOptions={valueOptions} />;
  }

  const groupedByLocation: { [location: string]: LocationData[] } = groupBy(data.data, data => data.name);
  const groupedByYear: { [location: string]: { [year: string]: LocationData[] } } = {};
  Object.keys(groupedByLocation).forEach(location => {
    const groupedByBudgetType = groupBy(groupedByLocation[location], processedData => processedData.year);
    groupedByYear[location] = groupedByBudgetType;
  });

  return (
    <LocationComparisonLineChart
      years={getYears(data.data)}
      data={groupedByYear}
      height={'500px'}
      valueOptions={valueOptions}
    />
  );
};

export { LocationComparisonChartDataHandler };
