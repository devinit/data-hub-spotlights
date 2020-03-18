import React, { FunctionComponent, useState, Children, isValidElement, cloneElement } from 'react';
import { LocationIndicatorData, SpotlightLocation, LocationData, SpotlightIndicator } from '../../utils';

interface LocationComparisonChartDataHandlerProps {
  data?: [LocationIndicatorData, LocationIndicatorData];
  locations?: SpotlightLocation[];
  countryCode: string;
  indicators: [SpotlightIndicator];
}

const getLocationData = (locations: string[], data: LocationData[]): number[] =>
  locations.map(location => {
    const match = data.find(_data => _data.name.toLowerCase() === location.toLowerCase());

    return match ? match.value : 0;
  });

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

  const locationData = getLocationData(locations, data[0].data);
  console.log('location is ' + JSON.stringify(locationData));
  console.log('locations are ' + JSON.stringify(locations));
  console.log('data is ' + JSON.stringify(data[0].data));

  if (locations.length && data.length) {
    return (
      <>
        {Children.map(
          props.children,
          child =>
            isValidElement(child) &&
            cloneElement(child, {
              labels: locations,
              series: {
                names: [props.indicators[0].name],
                data: [getLocationData(locations, data[0].data)]
              },
              height: getHeightFromCount(locations.length)
            })
        )}
      </>
    );
  }

  return <div>No Data</div>;
};

export { LocationComparisonChartDataHandler };
