import { Feature, MultiPolygon } from 'geojson';
import { groupBy } from 'underscore';
import { GeoJSONProperties, MapLocations, SpotlightFC } from './types';

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
