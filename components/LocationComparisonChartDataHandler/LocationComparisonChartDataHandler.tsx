import React, { FunctionComponent } from 'react';
import { LocationIndicatorData, SpotlightLocation, LocationData } from '../../utils';
import { LocationComparisonLineChart } from '../LocationComparisonLineChart';

interface ComponentProps {
  data?: LocationIndicatorData;
  locations: SpotlightLocation[];
  countryCode: string;
}

const getChartData = (data: LocationData[], locations: SpotlightLocation[]): any => {
  const chartDataArray: any = [];
  for (const k in data) {
    if (data.hasOwnProperty(k)) {
      const { name, value, year } = data[k];
      for (const key in locations) {
        if (locations.hasOwnProperty(key)) {
          const element = locations[key];
          if (name.toLowerCase() === element.name.toLowerCase()) {
            chartDataArray.push({
              name,
              value: value ? value : 0,
              year
            });
          }
        }
      }
    }
  }
  return chartDataArray;
};

const getSeriesData = (chartData: any, locations: any): [] => {
  const seriesDataArray: any = [];
  for (const k in locations) {
    const seriesData: any = {};
    seriesData['data'] = [];
    seriesData['year'] = [];
    if (locations.hasOwnProperty(k)) {
      for (const key in chartData) {
        if (chartData.hasOwnProperty(key)) {
          if (locations[k].name.toLowerCase() === chartData[key]['name'].toLowerCase()) {
            seriesData['name'] = chartData[key]['name'];
            seriesData['type'] = 'line';
            seriesData['data'].push(chartData[key]['value']);
            seriesData['year'].push(chartData[key]['year']);
          }
        }
      }
      seriesDataArray.push(seriesData);
    }
  }
  return seriesDataArray;
};

const getYears = (data: LocationData[]): number[] =>
  data.reduce((prev: number[], curr) => (prev.indexOf(curr.year) === -1 ? prev.concat(curr.year) : prev), []);

const LocationComparisonChartDataHandler: FunctionComponent<ComponentProps> = ({ data, ...props }) => {
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

  const chartData = getChartData(data.data, props.locations);
  const seriesData = getSeriesData(chartData, props.locations);

  return <LocationComparisonLineChart years={getYears(data.data)} series={seriesData} height={'500px'} />;
};

export { LocationComparisonChartDataHandler };
