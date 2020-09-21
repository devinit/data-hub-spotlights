import { useQuery } from '@apollo/client';
import React, {
  Children,
  cloneElement,
  FunctionComponent,
  isValidElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import {
  DataFilter,
  getBoundariesByDepth,
  GET_INDICATOR_DATA,
  LocationIndicatorData,
  SpotlightBoundary,
} from '../../utils';
import { Alert } from '../Alert';
import { alignDataToBoundaries } from './utils';

export interface DataLoaderProps {
  boundaries: SpotlightBoundary[];
  indicators?: string[];
  geocodes?: string[];
  startYear?: number;
  endYear?: number;
  limit?: number;
  filter?: DataFilter[][];
  onLoad?: (data: LocationIndicatorData[]) => void;
}

const DDWDataLoader: FunctionComponent<DataLoaderProps> = ({ indicators, geocodes, startYear, limit, ...props }) => {
  const [boundaries, setBoundaries] = useState(props.boundaries);
  const renderChildren = (dataLoading: boolean, data?: LocationIndicatorData[]): ReactNode =>
    Children.map(props.children, (child) =>
      isValidElement(child) ? cloneElement(child, { data, dataLoading }) : null
    );

  if (!indicators || !indicators.length) {
    return <>{renderChildren(false)}</>;
  }
  useEffect(() => {
    const districts = getBoundariesByDepth(props.boundaries, 'd');
    setBoundaries(districts);
  }, [props.boundaries]);

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
  if (data && boundaries) {
    const updatedData = alignDataToBoundaries(data.data, boundaries, startYear || props.endYear);

    return <>{renderChildren(loading, updatedData)}</>;
  }

  return <>{renderChildren(loading, data && data.data)}</>;
};

DDWDataLoader.defaultProps = { limit: 100 };

export { DDWDataLoader };
