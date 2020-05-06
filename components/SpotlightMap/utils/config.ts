import { toCamelCase } from '../../../utils';

export interface LayerConfig {
  type: 'shapefile' | 'geojson'; // can be shapefile or geojson - controls how the layer is handled
  style: string; // mapbox style url
  sourceLayer: string; // mapbox source-layer ID - found under Select data -> Source
  layerName: string;
  center: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  nameProperty: string; // the data property on the layer that corresponds to the location's name
  codeProperty: string; // the data property on the layer that corresponds to the location's code,
  formatter?: (value: string, target?: FormatterTarget) => string | number; // when there's a mismatch between API data & map data, this aligns them
}

export type FormatterTarget = 'map' | 'boundary' | 'tooltip';

interface MapConfig {
  layers: LayerConfig[];
}

export const config: { [key: string]: MapConfig } = {
  UG: {
    layers: [
      {
        type: 'shapefile',
        style: 'mapbox://styles/edwinmp/ck6an0ra90nob1ikvysfmbg15',
        sourceLayer: 'uganda_districts_2019_i-9qg3nj',
        layerName: 'uganda-districts-2019-i-9qg3nj',
        center: [32.655221, 1.344666],
        zoom: 6.1,
        minZoom: 5,
        maxZoom: 8,
        nameProperty: 'DName2019',
        codeProperty: 'dc2018',
        formatter: (value, target = 'map'): string => {
          if (target === 'map') {
            if (value.toLowerCase() === 'sembabule') {
              return 'SSEMBABULE';
            }
          }
          if (target === 'tooltip') {
            if (value.toLowerCase() === 'ssembabule') {
              return 'SEMBABULE';
            }
          }

          return value.toUpperCase();
        }
      }
    ]
  },
  KE: {
    layers: [
      {
        type: 'shapefile',
        style: 'mapbox://styles/edwinmp/ck6rgk8bs5sfd1it4z0jjqtd7',
        sourceLayer: 'ken_admbnda_adm1_iebc_2018060-1lmh46',
        layerName: 'ken-admbnda-adm1-iebc-2018060-1lmh46',
        center: [37.703, 0.482],
        zoom: 5.3,
        minZoom: 4,
        maxZoom: 6.5,
        nameProperty: 'ADM1_EN',
        codeProperty: 'ADM1_PCODE',
        formatter: (value, target = 'map'): string => {
          if (target === 'map') {
            if (value.toLowerCase() === 'trans-nzoia') {
              return 'Trans Nzoia';
            }
            if (value.toLowerCase() === 'nithi') {
              return 'Tharaka-Nithi';
            }
          }
          if (target === 'tooltip' || target === 'boundary') {
            if (value.toLowerCase() === 'trans nzoia') {
              return 'Trans-Nzoia';
            }
            if (value.toLowerCase() === 'tharaka-nithi') {
              return 'Nithi';
            }
          }

          return toCamelCase(value);
        }
      }
    ]
  }
};
