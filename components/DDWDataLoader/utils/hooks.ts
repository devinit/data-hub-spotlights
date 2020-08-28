import { ApolloError, useQuery } from '@apollo/client';
import { Dispatch, SetStateAction, useState } from 'react';
import { DataLoaderProps } from '..';
import { GET_INDICATOR_DATA, LocationIndicatorData, DataFilter } from '../../../utils';

interface DDWData {
  data?: LocationIndicatorData[];
  dataLoading: boolean;
  options: DataLoaderProps;
  filter?: DataFilter[][];
  setOptions: Dispatch<SetStateAction<DataLoaderProps>>;
  refetch?: (options?: DataLoaderProps) => void;
  error?: ApolloError;
}

export const useDDWData = (_options: DataLoaderProps): DDWData => {
  const [options, setOptions] = useState(_options);
  const { indicators, geocodes, startYear, endYear, filter, limit } = options;
  if (indicators && indicators.length) {
    const { data, loading, error, refetch, networkStatus } = useQuery<{ data: LocationIndicatorData[] }>(
      GET_INDICATOR_DATA,
      {
        variables: {
          indicators,
          geocodes,
          startYear: typeof startYear === 'number' ? startYear : undefined,
          endYear: typeof endYear === 'number' ? endYear : undefined,
          filter,
          limit,
        },
        notifyOnNetworkStatusChange: true,
      }
    );

    if (error) {
      console.log('useDDWData:', error.message);

      return { data: [], dataLoading: false, options, setOptions, refetch, error };
    }

    return { data: data && data.data, dataLoading: networkStatus === 4 || loading, options, refetch, setOptions };
  }

  return { data: [], dataLoading: false, options, setOptions };
};
