export interface LayerConfig {
  type: 'shapefile' | 'geojson'; // can be shapefile or geojson - controls how the layer is handled
  style: string; // mapbox style url
  source: string; // mapbox source-layer ID - found under Select data -> Source
  center: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  nameProperty: string; // the data property on the layer that corresponds to the location's name
  codeProperty: string; // the data property on the layer that corresponds to the location's code,
  format?: (value: string) => string | number; // when there's a mismatch between API data & map data, this aligns them
}

interface MapConfig {
  layers: LayerConfig[];
}

export const config: { [key: string]: MapConfig } = {
  UG: {
    layers: [
      {
        type: 'shapefile',
        style: 'mapbox://styles/edwinmp/ck6an0ra90nob1ikvysfmbg15',
        source: 'uganda_districts_2019_i-9qg3nj',
        center: [32.655221, 1.344666],
        zoom: 6.1,
        minZoom: 6,
        maxZoom: 7,
        nameProperty: 'DName2019',
        codeProperty: 'dc2018',
        format: (value: string): string => value.toUpperCase()
      }
    ]
  },
  KE: {
    layers: [
      {
        type: 'shapefile',
        style: 'mapbox://styles/edwinmp/ck6rgk8bs5sfd1it4z0jjqtd7',
        source: 'ken_admbnda_adm1_iebc_2018060-1lmh46',
        center: [37.703, 0.482],
        zoom: 5.3,
        minZoom: 5.0,
        maxZoom: 6,
        nameProperty: 'ADM1_EN',
        codeProperty: 'ADM1_PCODE',
        format: (value: string): string => {
          if (value === 'Trans-Nzoia') {
            return 'Trans Nzoia';
          }
          if (value === 'Nithi') {
            return 'Tharaka-Nithi';
          }

          return value;
        }
      }
    ]
  }
};
