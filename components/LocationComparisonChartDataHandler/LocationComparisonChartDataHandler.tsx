import React, { FunctionComponent } from 'react';
import { LocationIndicatorData, SpotlightLocation, LocationData } from '../../utils';
import { LocationComparisonLineChart } from '../LocationComparisonLineChart';
import { groupBy } from 'underscore';

interface ComponentProps {
  data?: LocationIndicatorData;
  locations: SpotlightLocation[];
  countryCode: string;
}

const getYears = (data: LocationData[]): number[] =>
  data.reduce((prev: number[], curr) => (prev.indexOf(curr.year) === -1 ? prev.concat(curr.year) : prev), []).sort();

const LocationComparisonChartDataHandler: FunctionComponent<ComponentProps> = ({ data }) => {
  if (!data) {
    return (
      <div>
        No Data
        <style jsx>{`
          padding: 20px;
          font-size: 1.6em;
        `}</style>
      </div>
    );
  }

  const groupedByLocation: { [location: string]: LocationData[] } = groupBy(data.data, data => data.name);
  const groupedByYear: { [location: string]: { [year: string]: LocationData[] } } = {};
  Object.keys(groupedByLocation).forEach(location => {
    const groupedByBudgetType = groupBy(groupedByLocation[location], processedData => processedData.year);
    groupedByYear[location] = groupedByBudgetType;
  });

  return <LocationComparisonLineChart years={getYears(data.data)} data={groupedByYear} height={'500px'} />;
};

export { LocationComparisonChartDataHandler };