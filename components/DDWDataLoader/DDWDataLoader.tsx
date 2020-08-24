import { useQuery } from '@apollo/client';
import React, {
  Children,
  cloneElement,
  FunctionComponent,
  isValidElement,
  ReactNode,
  useEffect,
  useState
} from 'react';
import {
  DataFilter,
  getBoundariesByDepth,
  GET_INDICATOR_DATA,
  LocationIndicatorData,
  SpotlightBoundary,
  toCamelCase
} from '../../utils';
import { Alert } from '../Alert';
import { getLocationIDFromGeoCode } from '../SpotlightMap/utils';

export interface DataLoaderProps {
  indicators?: string[];
  geocodes?: string[];
  startYear?: number;
  endYear?: number;
  limit?: number;
  filter?: DataFilter[][];
  onLoad?: (data: LocationIndicatorData[]) => void;
}

const alignDataToBoundaries = (
  data: LocationIndicatorData[],
  boundaries: SpotlightBoundary[],
  year?: number
): LocationIndicatorData[] => {
  return data.map(indicator => {
    const indicatorData = indicator.data.slice();
    if (indicatorData.length < boundaries.length) {
      const missingLocations = boundaries.filter(boundary => {
        const missing = !indicatorData.find(d => boundary.geocode.includes(d.geocode));

        return year && missing ? missing && parseInt(boundary.created || '0') > year : missing;
      });

      missingLocations
        .filter(d => d.parent)
        .forEach(boundary => {
          const parent = indicatorData.find(d => boundary.parent?.includes(d.geocode));
          if (parent) {
            const location = {
              ...parent,
              geocode: getLocationIDFromGeoCode(boundary.geocode, '.'),
              name: toCamelCase(boundary.name)
            };

            indicatorData.push(location);
          }
        });
    }

    return { ...indicator, data: indicatorData };
  });
};

const DDWDataLoader: FunctionComponent<DataLoaderProps & { boundaries: SpotlightBoundary[] }> = ({
  indicators,
  geocodes,
  startYear,
  limit,
  ...props
}) => {
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
  if (data) {
    const updatedData = alignDataToBoundaries(data.data, boundaries, startYear || props.endYear);

    return <>{renderChildren(loading, updatedData)}</>;
  }

  return <>{renderChildren(loading)}</>;
};

DDWDataLoader.defaultProps = { limit: 100 };

export { DDWDataLoader };
