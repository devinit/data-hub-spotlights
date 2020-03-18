import React, { FunctionComponent, useState, Children, isValidElement, cloneElement } from 'react';
import { LocationIndicatorData, SpotlightLocation, SpotlightIndicator } from '../../utils';

interface LocationComparisonChartDataHandlerProps {
  data?: [LocationIndicatorData, LocationIndicatorData];
  locations?: SpotlightLocation[];
  countryCode: string;
  indicators: [SpotlightIndicator];
}

const getChartData = (data: any, locations: any): any => {
  const chartDataArray: any = [];
  for (const k in data) {
    if (data.hasOwnProperty(k)) {
      const { name, value, year } = data[k];
      for (const key in locations) {
        if (locations.hasOwnProperty(key)) {
          const element = locations[key];
          if (name === element.name) {
            chartDataArray.push({
              name,
              value,
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
          if (locations[k].name === chartData[key]['name']) {
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

const getChartYears = (seriesData: any): string[] => {
  let largestArray: [] = [];
  for (let index = 0; index < seriesData.length; index++) {
    const currentLength = seriesData[index]['year'];
    const nextLength = seriesData[index + 1] ? seriesData[index + 1]['year'] : [];
    if (currentLength > nextLength) {
      largestArray = currentLength;
    } else {
      largestArray = nextLength;
    }
  }
  console.log('Chart data is ' + JSON.stringify(largestArray));
  return largestArray;
};

const getHeightFromCount = (count = 12): string => (count >= 12 ? `${((count / 12) * 500).toFixed()}px` : '500px');

const LocationComparisonChartDataHandler: FunctionComponent<LocationComparisonChartDataHandlerProps> = ({
  data,
  ...props
}) => {
  const [locations] = useState<string[]>(
    (props.locations || [])
      .map(location => location.name)
      .sort()
      .reverse() // eCharts stacks the data, first down last up. So reverse is necessary to show it properly
  );
  if (!data) {
    return <div>No Data</div>;
  }

  const charData = getChartData(data[0].data, props.locations);
  const seriesData = getSeriesData(charData, props.locations);

  console.log('Chart data is ' + JSON.stringify(charData));
  console.log('The series data is ' + JSON.stringify(seriesData));

  if (locations.length && data.length) {
    return (
      <>
        {Children.map(
          props.children,
          child =>
            isValidElement(child) &&
            cloneElement(child as React.ReactElement<any>, {
              years: getChartYears(seriesData),
              labels: locations,
              series: seriesData,
              height: getHeightFromCount(locations.length)
            })
        )}
      </>
    );
  }

  return <div>No Data</div>;
};

export { LocationComparisonChartDataHandler };
