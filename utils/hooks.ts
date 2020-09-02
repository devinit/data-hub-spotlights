import { useContext, useEffect, useState } from 'react';
import { CountryContext } from './context';
import {
  BoundaryDepth,
  getBoundariesByCountryCode,
  getBoundariesByDepth,
  sortBoundariesByName,
  SpotlightBoundary,
} from './locations';

export const useBoundaries = (depth: BoundaryDepth): [SpotlightBoundary[], SpotlightBoundary[]] => {
  const { countryCode } = useContext(CountryContext);
  const [boundaries, setBoundaries] = useState<SpotlightBoundary[]>([]);

  useEffect(() => {
    getBoundariesByCountryCode(countryCode).then((boundaries) => setBoundaries(sortBoundariesByName(boundaries)));
  }, [countryCode]);

  return [boundaries, getBoundariesByDepth(boundaries, depth)];
};
