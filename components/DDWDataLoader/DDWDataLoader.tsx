import { useQuery } from '@apollo/client';
import React, { Children, cloneElement, FunctionComponent, isValidElement, ReactNode } from 'react';
import { DataFilter, GET_INDICATOR_DATA, LocationIndicatorData } from '../../utils';
import { Alert } from '../Alert';

export interface DataLoaderProps {
  indicators?: string[];
  geocodes?: string[];
  startYear?: number;
  endYear?: number;
  limit?: number;
  filter?: DataFilter[][];
  onLoad?: (data: LocationIndicatorData[]) => void;
}

const DDWDataLoader: FunctionComponent<DataLoaderProps> = ({ indicators, geocodes, startYear, limit, ...props }) => {
  const renderChildren = (dataLoading: boolean, data?: LocationIndicatorData[]): ReactNode =>
    Children.map(props.children, (child) =>
      isValidElement(child) ? cloneElement(child, { data, dataLoading }) : null
    );

  if (!indicators || !indicators.length) {
    return <>{renderChildren(false)}</>;
  }

  const { data, loading, error } = useQuery<{ data: LocationIndicatorData[] }>(GET_INDICATOR_DATA, {
    variables: {
      indicators,
      geocodes: geocodes || [],
      startYear,
      endYear: props.endYear || startYear,
      filter: props.filter || [],
      limit,
    },
  });
  if (error) {
    console.log('DDWDataLoader:', error.message);

    return <Alert variant="error">Something went wrong while rendering this widget</Alert>;
  }
  if (props.onLoad && !loading && data) {
    props.onLoad(data.data);
  }

  return <>{renderChildren(loading, data && data.data)}</>;
};

DDWDataLoader.defaultProps = { limit: 100 };

export { DDWDataLoader };
