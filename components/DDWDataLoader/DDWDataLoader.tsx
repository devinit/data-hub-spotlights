import React, { Children, FunctionComponent, cloneElement, isValidElement, ReactNode } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_INDICATOR_DATA, LocationIndicatorData } from '../../utils';

interface MapDataLoaderProps {
  indicator?: string;
  geocode?: string;
  year?: number;
}

const DDWDataLoader: FunctionComponent<MapDataLoaderProps> = ({ children, indicator, geocode, year }) => {
  const renderChildren = (dataLoading: boolean, mapData?: LocationIndicatorData): ReactNode =>
    Children.map(children, child =>
      isValidElement(child) ? cloneElement(child, { data: mapData, dataLoading }) : null
    );

  if (!indicator) {
    return <>{renderChildren(false)}</>;
  }

  const { data, loading, error } = useQuery<{ data: LocationIndicatorData[] }>(GET_INDICATOR_DATA, {
    variables: {
      indicators: [indicator],
      geocodes: geocode ? [geocode] : [],
      startYear: year,
      endYear: year
    }
  });
  if (error) {
    throw Error(error.message);
  }

  return <>{renderChildren(loading, data && data.data[0])}</>;
};

export { DDWDataLoader };
