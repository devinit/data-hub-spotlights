import React, { Children, FunctionComponent, cloneElement, isValidElement } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_INDICATOR_DATA } from '../../utils';

interface MapDataLoaderProps {
  indicator?: string;
  geocode?: string;
  year?: number;
}

const MapDataLoader: FunctionComponent<MapDataLoaderProps> = ({ children, indicator, geocode, year }) => {
  const renderMap = (dataLoading: boolean, mapData?: any) => Children.map(children, child =>
    isValidElement(child) ? cloneElement(child, { data: mapData, loading: dataLoading }) : null
  );

  if (!indicator) {
    return <>{ renderMap(false) }</>;
  }

  const { data, loading, error } = useQuery(GET_INDICATOR_DATA, {
    variables: {
      indicators: [ indicator ],
      geocodes: geocode ? [ geocode ] : [],
      startYear: year,
      endYear: year
    } });
  if (error) {
    throw Error(error.message);
  }

  return <>{ renderMap(loading, data && data.data) }</>;
};

export { MapDataLoader };
