import { LocationIndicatorData, SpotlightBoundary, toCamelCase } from '../../../utils';
import { getLocationIDFromGeoCode } from '../../SpotlightMap/utils';

export * from './hooks';

export const alignDataToBoundaries = (
  data: LocationIndicatorData[],
  boundaries: SpotlightBoundary[],
  year?: number
): LocationIndicatorData[] => {
  return data.map((indicator) => {
    const indicatorData = indicator.data.slice();
    if (indicatorData.length < boundaries.length) {
      const missingLocations = boundaries.filter((boundary) => {
        const missing = !indicatorData.find((d) => boundary.geocode.includes(d.geocode));

        return year && missing ? missing && parseInt(boundary.created || '0') > year : missing;
      });

      missingLocations
        .filter((d) => d.parent)
        .forEach((boundary) => {
          const parent = indicatorData.find((d) => boundary.parent?.includes(d.geocode));
          if (parent) {
            const location = {
              ...parent,
              geocode: getLocationIDFromGeoCode(boundary.geocode, '.'),
              name: toCamelCase(boundary.name),
            };

            indicatorData.push(location);
          }
        });
    }

    return { ...indicator, data: indicatorData };
  });
};
