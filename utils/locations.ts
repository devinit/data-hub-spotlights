import { sortBy as _sortBy } from 'underscore';
import { SelectOption, SelectOptions } from '../components/Select';
import { getLocationIDFromGeoCode } from '../components/SpotlightMap/utils';
import { SpotlightLocation } from './data';
import { toCamelCase } from './strings';

export interface SpotlightBoundary extends SpotlightLocation {
  code: string;
  geocode: string;
  name: string;
  children: SpotlightBoundary[];
}

export const getBoundariesByCountryCode = async (countryCode: string): Promise<SpotlightBoundary[]> =>
  await import(`../boundaries/${countryCode}`).then(({ default: boundaries }) => boundaries);

export const getBoundariesByDepth = (locations: SpotlightBoundary[], depth: 'd' | 'sc'): SpotlightBoundary[] => {
  let districts: SpotlightBoundary[] = [];
  if (depth === 'd') {
    locations.forEach(location => {
      const code = getLocationIDFromGeoCode(location.geocode, '.');
      if (code.indexOf('d') > -1) {
        districts = districts.concat([location]);
      } else if (code.indexOf('r') > -1) {
        districts = districts.concat(location.children);
      }
    });
  }

  return districts;
};

// TODO: this is temporary - replace with correct location handler
export const createLocationOptions = (
  locations: SpotlightBoundary[],
  depth: 'd' | 'sc',
  _group = false // TODO: use when grouping by region/district
): SelectOptions => {
  const districts: SpotlightBoundary[] = getBoundariesByDepth(locations, depth);
  // up to district level
  const options: SelectOption[] = districts.map(content => ({
    label: toCamelCase(content.name),
    value: content.geocode
  }));

  return options;
};

export const sortBoundariesByName = (boundaries: SpotlightBoundary[]): SpotlightBoundary[] =>
  _sortBy(boundaries, 'name').map(boundary => {
    if (boundary.children) {
      boundary.children = sortBoundariesByName(boundary.children);
    }

    return boundary;
  });

export const findBoundaryByName = (
  boundaries: SpotlightBoundary[],
  boundaryName: string
): SpotlightBoundary | undefined => {
  let boundary: SpotlightBoundary | undefined = undefined;

  for (let index = 0; index < boundaries.length && !boundary; index++) {
    const currentBoundary = boundaries[index];
    if (index === 0) {
      boundary = boundaries.find(location => location.name.toLowerCase() === boundaryName);
      if (!boundary && currentBoundary.children) {
        boundary = findBoundaryByName(currentBoundary.children, boundaryName);
      }
    } else if (currentBoundary.name.toLowerCase() === boundaryName) {
      boundary = currentBoundary;
    } else if (currentBoundary.children) {
      boundary = findBoundaryByName(currentBoundary.children, boundaryName);
    }
  }

  return boundary;
};

export const getBasePathFromContext = (): string =>
  process.env.NODE_ENV === 'production' ? '/data/spotlights-on-kenya-and-uganda/' : '/spotlight/';
