import React, { FunctionComponent, useEffect, useState } from 'react';
import { Select } from '../Select';
import { Map } from '../Map/Map';
import kenyanCounties from './geoJSON/kenyan-counties.json';
import kenyaSubcounties from './geoJSON/kenya-subcounty-proposal.json';
import kenyaCountyPopulationData from './geoJSON/county_population_data.json';
import { Legend, LegendItem } from '../Legend';
import * as distance from 'jaro-winkler';
import * as turf from '@turf/turf';
import L from 'leaflet';

interface MapContainerProps {
  padding?: string;
}

interface State {
  leaflet: any;
  map?: L.Map;
  selectedCounty: string;
  boundaryType: string;
  subcountyDropdownOptions: any[];
  selectedSubcounty: string;
  counties_with_population: any[];
  mapCenter?: L.LatLng;
  zoom: number;
  layers: L.TileLayer[];
  mapID: string;
  districtsLayer?: L.GeoJSON;
}

const KenyaContainer: FunctionComponent<MapContainerProps> = ({ padding }) => {
  const [ state, setState ] = useState<State>({
    leaflet: {},
    selectedCounty: '',
    boundaryType: 'all',
    subcountyDropdownOptions: [],
    selectedSubcounty: '',
    counties_with_population: [],
    mapCenter: new L.LatLng(0.2601, 37.2757),
    zoom: 6,
    layers: [
      L.tileLayer('https://api.mapbox.com/styles/v1/davidserene/ck56hj7h10o861clbgsqu7h88/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGF2aWRzZXJlbmUiLCJhIjoiUkJkd1hGWSJ9.SCxMvCeeovv99ZDnpfpNwA', {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
      })
    ],
    mapID: 'kenya_map'
  });

  useEffect(() => {
    addLayer();
  }, [ state ]);

  const color = [
    '#fff5f0',
    '#fee0d2',
    '#fcbba1',
    '#fc9272',
    '#fb6a4a',
    '#ef3b2c',
    '#cb181d',
    '#99000d'
  ];

  const grades = [
    250000,
    500000,
    750000,
    1500000,
    2600000,
    3000000,
    4000000
  ];

  function initialiseMapState(leaflet: any, map: L.Map) {
    setState(prevState => {
      return {
        ...prevState,
        leaflet,
        map,
        counties_with_population: mergeCountiesToPopulation(kenyanCounties, kenyaCountyPopulationData)
      };
    });
  }

  function mergeCountiesToPopulation(counties: any, countyPopulation: any) {
    const data: any[] = [];
    for (const key1 in counties.features) {
      if (counties.features[key1]) {
        for (const key2 in countyPopulation) {
          if (countyPopulation[key2]) {
            const similarity = distance(
              counties.features[key1].properties.COUNTY.trim().toLowerCase(),
              countyPopulation[key2].county.trim().toLowerCase()
            );
            if (similarity > 0.7) {
              const holder = counties.features[key1];
              data.push({
                ...holder,
                properties: {
                  ...holder.properties,
                  population: countyPopulation[key2].population
                }
              });
            }
          }
        }
      }
    }

    return data;
  }

  function loadCountySelect(counties: any) {
    const options = [];
    for (const county in counties.features) {
      if (counties.features) {
        options.push({
          value: counties.features[county].properties.COUNTY,
          label: counties.features[county].properties.COUNTY
        });
      }
    }

    return options;
  }

  function loadSubcountySelect(subcounties: any[]) {
    const options = [];
    for (const subcounty in subcounties) {
      if (subcounties[subcounty]) {
        options.push({
          value: subcounties[subcounty].properties.ADMIN2,
          label: subcounties[subcounty].properties.ADMIN2
        });
      }
    }

    return options;
  }

  function handleCountyChange(selectedOption: any) {
    const countySubcounties = findSelectedCountySubcounties(selectedOption.value, kenyaSubcounties);
    const subcountyOptions = loadSubcountySelect(countySubcounties);

    setState(prevState => {
      return {
        ...prevState,
        selectedCounty: selectedOption.value,
        boundaryType: 'district',
        subcountyDropdownOptions: subcountyOptions
      };
    });
  }

  function handleSubcountyChange(selectedOption: any) {
    setState(prevState => {
      return {
        ...prevState,
        selectedSubcounty: selectedOption.value,
        boundaryType: 'subcounty'
      };
    });
  }

  function addLayer() {
    const flag = state.boundaryType;
    if (flag === 'all') {
      showAllKenyaCounties();
    } else if (flag === 'district') {
      showOneKenyaCounty();
    } else if (flag === 'subcounty') {
      showKenyaSubcounties();
    }
  }

  function clean_map() {
    if (state.map) {
      const map = state.map;
      map.eachLayer((layer: any) => {
        if (layer instanceof state.leaflet.GeoJSON) {
          map.removeLayer(layer);
        }
      });
    }
  }

  function redrawMap(featureCollection: any) {
    if (Object.keys(state.leaflet).length > 0) {
      const layer = state.leaflet.geoJson(featureCollection, {
        style,
        onEachFeature
      });
      layer.addTo(state.map);

      return layer;
    }
  }

  function style(feature: any) {
    return {
        fillColor: getColor(feature.properties.population),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
  }

  function getColor(d: number) {
    return d > 4000000 ? '#99000d' :
        d > 3000000 ? '#cb181d' :
        d > 2600000 ? '#ef3b2c' :
        d > 1500000 ? '#fb6a4a' :
        d > 750000 ? '#fc9272' :
        d > 500000 ? '#fcbba1' :
        d > 250000 ? '#fee0d2' :
                    '#fff5f0';
  }

  function onEachFeature(_feature: any, layer: any) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetFeature
    });
  }

  function highlightFeature(e: L.LayerEvent) {
    const layer = e.target;
    const latLng = layer.getBounds().getCenter();
    addPopup(latLng, e);
  }

  function resetFeature(e: any) {
      if (state.map) {
        state.map.eachLayer(layer => {
          if (layer instanceof L.Popup) {
            layer.remove();
          }
        });
      }
      if (state.districtsLayer) {
        state.districtsLayer.resetStyle(e.target);
      }
  }

  function showAllKenyaCounties() {
    state.districtsLayer = redrawMap(state.counties_with_population);
  }

  function showOneKenyaCounty() {
    const countySubcounties = findSelectedCountySubcounties(state.selectedCounty, kenyaSubcounties);
    clean_map();
    for (const key in countySubcounties) {
      if (countySubcounties[key]) {
        redrawMap(countySubcounties[key]);
      }
    }
    const center: any = getCenterOfFeatureCollection(countySubcounties);
    if (state.map) {
      const map = state.map;
      map.flyTo([
        center.geometry.coordinates[1],
        center.geometry.coordinates[0]
      ], 9);
    }
  }

  function addPopup(LatLng: L.LatLng, e: L.LayerEvent) {
    const popup: L.Popup = L.popup(/* {autoClose:false} */)
    .setLatLng(LatLng)
    .setContent('<b>County Population</b><br/>' + e.target.feature.properties.COUNTY + '<br/>' +
    e.target.feature.properties.population);
    if (state.map) {
      state.map.addLayer(popup);
    }
  }

  function showKenyaSubcounties() {
    const subCounties = findSelectedCountySubcounties(state.selectedCounty, kenyaSubcounties);
    clean_map();

    for (const subcounty in subCounties) {
      if (subCounties[subcounty]) {
        const similarity = distance(
          state.selectedSubcounty.toLowerCase(),
          subCounties[subcounty].properties.ADMIN2.toLowerCase()
        );
        if (similarity === 1) {
          redrawMap(subCounties[subcounty]);
          const center: any = getCenterOfSubcountyFeatureCollection(subCounties[subcounty]);
          if (state.map) {
            const map = state.map;
            map.flyTo([
              center.geometry.coordinates[1],
              center.geometry.coordinates[0]
            ], 10);
          }
          break;
        }
      }
    }
  }

  function findSelectedCountySubcounties(district: string, allSubcounties: any) {
    const selectedGeometry = [];
    const subcounties = allSubcounties.features;
    for (const subcounty in subcounties) {
      if (subcounties[subcounty]) {
        const current_district = subcounties[subcounty].properties.ADMIN1;
        const similarity = distance(district.toLowerCase(), current_district.toLowerCase());
        if (similarity === 1) {
          selectedGeometry.push(subcounties[subcounty]);
        }
      }
    }

    return selectedGeometry;
  }

  function getCenterOfFeatureCollection(subCounties: any[]) {
    const points: any[] = [];
    let coordinates_array: any[] = [];
    for (const key in subCounties) {
      if (subCounties[key]) {
        if (subCounties[key].geometry.type === 'Polygon') {
          coordinates_array = subCounties[key].geometry.coordinates.reduce((p: any, c: any) => {
            return p.concat(c);
          });
        } else if (subCounties[key].geometry.type === 'MultiPolygon') {
          for (const item in subCounties[key].geometry.coordinates) {
            if (subCounties[key].geometry.coordinates[item]) {
              const holder = subCounties[key].geometry.coordinates[item].reduce((p: any, c: any) => {
                return p.concat(c);
              });
              coordinates_array.concat(holder);
            }
          }

        }

        for (const item in coordinates_array) {
          if (coordinates_array[item] instanceof Array) {
            points.push(turf.point(coordinates_array[item]));
          }
        }
      }
    }

    return turf.center(turf.featureCollection(points));
  }

  function getCenterOfSubcountyFeatureCollection(subCounties: any) {
    const points = [];
    let coords: any[] = [];
    if (subCounties.geometry.type === 'Polygon') {
      coords = subCounties.geometry.coordinates.reduce((p: any, c: any) => {
        return p.concat(c);
      });
    } else if (subCounties.geometry.type === 'MultiPolygon') {
      for (const item in subCounties.geometry.coordinates) {
        if (subCounties.geometry.coordinates[item]) {
          const holder = subCounties.geometry.coordinates[item].reduce((p: any, c: any) => {
            return p.concat(c);
          });
          coords.concat(holder);
        }
      }

    }
    for (const item in coords) {
      if (coords[item] && (coords[item] instanceof Array)) {
        points.push(turf.point(coords[item]));
      }
    }
    const features = turf.featureCollection(points);

    return turf.center(features);
  }

  return (
    <div style={ { padding: '20px' } }>
      <div style={ { margin: '10px' } }>
        <Select options={ loadCountySelect(kenyanCounties) } onChange={ handleCountyChange } />
      </div>
      <div style={ { margin: '10px' } }>
        <Select options={ state.subcountyDropdownOptions } onChange={ handleSubcountyChange } />
      </div>
      <div style={ { width: '100%' } }>
        <div style={ { padding, width: '70%', float: 'right' } }>
          <Map
            saveMapState={ initialiseMapState }
            mapCenter={ state.mapCenter }
            zoom={ state.zoom }
            layers={ state.layers }
            mapID={ state.mapID }
          />
        </div>
        <div style={ { float: 'left', width: '30%', backgroundColor: '#fff', position: 'relative', top: '100' } }>
          <Legend>
            {
              grades.map((grade, index) => {
                if (index === 0) {
                  return <LegendItem key={ index } bgColor={ color[index] }><span>{ '0 - ' + grade }</span>
                  </LegendItem>;
                } else {
                return <LegendItem key={ index } bgColor={ color[index] }>{ grade }{ (grades[index + 1])
                  ? ' - ' + (grades[index + 1]) : ' > ' }
                  </LegendItem>;
                }
                if (!color[index + 1]) {
                  return <LegendItem/>;
                }
              })
            }
          </Legend>
        </div>
      </div>
    </div>
  );
};

KenyaContainer.defaultProps = {
  padding: '50px'
};

export { KenyaContainer };
