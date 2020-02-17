import { Feature, MultiPolygon } from 'geojson';
import { groupBy } from 'underscore';
import { GeoJSONProperties, MapLocations, SpotlightFC } from './types';
import { LocationData } from '../../../utils';

export * from './types';

export const filterGeoJSONByLevel = (geojson: SpotlightFC, levels: number[]): SpotlightFC => ({
  ...geojson,
  features: levels.length
    ? geojson.features.filter(feature => {
        const level = feature.properties.geocode.split('.').length - 1;

        return levels.indexOf(level) > -1;
      })
    : geojson.features
});

export const extractLocationsFromGeoJSON = (geojson: Feature<MultiPolygon, GeoJSONProperties>[]): MapLocations => {
  const locations = geojson.map(({ properties }) => {
    const { geometry, ...data } = properties;

    return data;
  });
  const { undefined: other, ...regional } = groupBy(locations, location => location.region);

  return { regional, other };
};

export const defaultMapStyle = {
  color: '#ffffff',
  weight: 0.6,
  fillOpacity: 1,
  fillColor: '#D0CCCF'
};

export const getLocationIDFromGeoCode = (geocode: string) => {
  const geocodeArray = geocode.split('.');

  return geocodeArray.length > 1 ? geocodeArray[geocodeArray.length - 1] : geocodeArray[0];
};

export const getFillColor = (geocode: string, data?: LocationData[], range?: string[], colours?: string[]): string => {
  const locationID = getLocationIDFromGeoCode(geocode);
  if (data && range && colours) {
    const match = data.find(location => getLocationIDFromGeoCode(location.geocode) === locationID);
    if (match) {
      const matchingRange = range.find(rng => parseFloat(match.value) <= parseFloat(rng));

      if (matchingRange) {
        return colours[range.indexOf(matchingRange)];
      } else if (parseFloat(match.value) > parseFloat(range[range.length - 1])) {
        return colours[colours.length - 1];
      }
    }
  }

  return defaultMapStyle.fillColor;
};
