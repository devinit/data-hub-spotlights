import { LocationIndicatorData, SpotlightLocation } from '../../../utils';
import { FeatureCollection, Geometry, MultiPolygon } from 'geojson';

export interface SpotlightMapProps {
  center?: number[];
  zoom?: number;
  countryCode: string;
  levels?: number[];
  loading?: boolean;
  data?: LocationIndicatorData;
  onLoad?: (data: MapLocations) => void;
}

export interface SpotlightMapGeoJSON {
  all?: SpotlightFC;
  filtered?: SpotlightFC;
}

export interface GeoJSONProperties extends SpotlightLocation {
  region?: string;
  geometry: Geometry;
}

export type SpotlightFC = FeatureCollection<MultiPolygon, GeoJSONProperties>;

export interface MapLocations {
  regional: {
    [key: string]: SpotlightLocation[]
  };
  other: SpotlightLocation[];
}
