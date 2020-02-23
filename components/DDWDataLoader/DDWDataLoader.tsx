import React, { Children, FunctionComponent, cloneElement, isValidElement, ReactNode } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_INDICATOR_DATA, LocationIndicatorData } from '../../utils';

interface MapDataLoaderProps {
  indicators?: string[];
  geocode?: string;
  year?: number;
  limit?: number;
}

const DDWDataLoader: FunctionComponent<MapDataLoaderProps> = ({ children, indicators, geocode, year, limit }) => {
  const renderChildren = (dataLoading: boolean, mapData?: LocationIndicatorData): ReactNode =>
    Children.map(children, child =>
      isValidElement(child) ? cloneElement(child, { data: mapData, dataLoading }) : null
    );

  if (!indicators || !indicators.length) {
    return <>{renderChildren(false)}</>;
  }

  const { data, loading, error } = useQuery<{ data: LocationIndicatorData[] }>(GET_INDICATOR_DATA, {
    variables: {
      indicators,
      geocodes: geocode ? [geocode] : [],
      startYear: year,
      endYear: year,
      limit
    }
  });
  if (error) {
    throw Error(error.message);
  }

  return <>{renderChildren(loading, data && data.data[0])}</>;
};

DDWDataLoader.defaultProps = { limit: 100 };

export { DDWDataLoader };
