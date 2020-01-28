import React, { FunctionComponent, useEffect, useState } from 'react';
import { Select } from '../Select';
import { Map } from '../Map/Map';
import ugandaDistricts from './geoJSON/district.json';
import ugandasubcounties from './geoJSON/subcounty.json';
import * as distance from 'jaro-winkler';
import * as turf from '@turf/turf';
import L from 'leaflet';

interface MapContainerProps {
  padding?: string;
}

interface State {
  leaflet: any;
  map?: L.Map;
  selectedDistrict: string;
  boundaryType: string;
  subcountyDropdownOptions: any[];
  selectedSubcounty: string;
  mapCenter?: L.LatLng;
  zoom?: number;
  layers: L.TileLayer[];
  mapID: string;
}

const UgandaContainer: FunctionComponent<MapContainerProps> = ({ padding }) => {
  const [ state, setState ] = useState<State>({
    leaflet: {},
    selectedDistrict: '',
    boundaryType: 'all',
    subcountyDropdownOptions: [],
    selectedSubcounty: '',
    mapCenter: new L.LatLng(1.4576, 32.5825),
    layers: [
      L.tileLayer('https://api.mapbox.com/styles/v1/davidserene/ck56hj7h10o861clbgsqu7h88/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGF2aWRzZXJlbmUiLCJhIjoiUkJkd1hGWSJ9.SCxMvCeeovv99ZDnpfpNwA', {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
      })
    ],
    mapID: 'map'
  });

  useEffect(() => {
    addLayer();
  }, [ state ]);

  function initialiseMapState(leaflet: any, map: any) {
    setState(prevState => {
      return {
        ...prevState,
        leaflet,
        map
      };
    });
    addLayer();
  }

  function loadDistrictSelect(districts: any) {
    const options = [];
    for (const district in districts.features) {
      if (districts.features) {
        options.push({
          value: districts.features[district].properties.DNAME2014,
          label: districts.features[district].properties.DNAME2014
        });
      }
    }

    return options;
  }

  function loadSubcountySelect(subcounties: any) {
    const options = [];
    for (const subcounty in subcounties) {
      if (subcounties[subcounty]) {
        options.push({
          value: subcounties[subcounty].properties.SName2016,
          label: subcounties[subcounty].properties.SName2016
        });
      }
    }

    return options;
  }

  function handleDistrictChange(selectedOption: any) {
    const districtSubcounties = findSelectedDistrictSubcounties(selectedOption.value, ugandasubcounties);
    const subcountyOptions = loadSubcountySelect(districtSubcounties);

    setState(prevState => {
      return {
        ...prevState,
        selectedDistrict: selectedOption.value,
        boundaryType: 'district',
        subcountyDropdownOptions: subcountyOptions
      };
    });

    addLayer();
  }

  function handleSubcountyChange(selectedOption: any) {
    setState(prevState => {
      return {
        ...prevState,
        selectedSubcounty: selectedOption.value,
        boundaryType: 'subcounty'
      };
    });
    addLayer();
  }

  function addLayer() {
    const flag = state.boundaryType;
    if (flag === 'all') {
      showAllUgandaDistricts();
    } else if (flag === 'district') {
      showOneUgandaDistrict();
    } else if (flag === 'subcounty') {
      showUgandaDistrictSubcounties();
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
        style: {
          color: '#ffffff',
          weight: 1,
          opacity: 0.65
        }
      });
      layer.addTo(state.map);
    }
  }

  function showAllUgandaDistricts() {
    redrawMap(ugandaDistricts);
  }

  function showOneUgandaDistrict() {
    const districtSubcounties = findSelectedDistrictSubcounties(state.selectedDistrict, ugandasubcounties);
    clean_map();
    for (const key in districtSubcounties) {
      if (districtSubcounties[key]) {
        redrawMap(districtSubcounties[key]);
      }
    }
    const center: any = getCenterOfFeatureCollection(districtSubcounties);
    if (state.map) {
      const map = state.map;
      map.flyTo([
        center.geometry.coordinates[1],
        center.geometry.coordinates[0]
      ], 10);
    }
  }

  function showUgandaDistrictSubcounties() {
    const districtSubcounties = findSelectedDistrictSubcounties(state.selectedDistrict, ugandasubcounties);
    clean_map();

    for (const subcounty in districtSubcounties) {
      if (districtSubcounties[subcounty]) {
        const similarity = distance(
          state.selectedSubcounty.toLowerCase(),
          districtSubcounties[subcounty].properties.SName2016.toLowerCase()
        );
        if (similarity > 0.9) {
          redrawMap(districtSubcounties[subcounty]);
          const center: any = getCenterOfSubcountyFeatureCollection(districtSubcounties[subcounty]);
          if (state.map) {
            const map = state.map;
            map.flyTo([
              center.geometry.coordinates[1],
              center.geometry.coordinates[0]
            ], 11);
          }
        }
      }
    }
  }

  function findSelectedDistrictSubcounties(district: string, allSubcounties: any) {
    const selectedGeometry = [];
    const subcounties = allSubcounties.features;
    for (const subcounty in subcounties) {
      if (subcounties[subcounty]) {
        const current_district = subcounties[subcounty].properties.DName2016;
        const similarity = distance(district.toLowerCase(), current_district.toLowerCase());
        if (similarity > 0.9) {
          selectedGeometry.push(subcounties[subcounty]);
        }
      }
    }

    return selectedGeometry;
  }

  function getCenterOfFeatureCollection(districtSubcounties: any) {
    const points = [];
    for (const key in districtSubcounties) {
      if (districtSubcounties[key]) {
        for (const item in districtSubcounties[key].geometry.coordinates[0][0]) {
          if (districtSubcounties[key].geometry.coordinates[0][0]) {
            points.push(turf.point(districtSubcounties[key].geometry.coordinates[0][0][item]));
          }
        }
      }
    }

    return turf.center(turf.featureCollection(points));
  }

  function getCenterOfSubcountyFeatureCollection(districtSubcounties: any) {
    const points = [];
    const coords = districtSubcounties.geometry.coordinates[0][0];
    for (const item in coords) {
      if (coords[item]) {
        points.push(turf.point(coords[item]));
      }
    }
    const features = turf.featureCollection(points);

    return turf.center(features);
  }

  return (
    <div style={ { padding: '20px' } }>
      <div style={ { margin: '10px' } }>
        <Select options={ loadDistrictSelect(ugandaDistricts) } onChange={ handleDistrictChange } />
      </div>
      <div style={ { margin: '10px' } }>
        <Select options={ state.subcountyDropdownOptions } onChange={ handleSubcountyChange } />
      </div>
      <div style={ { padding } }>
        <Map
          saveMapState={ initialiseMapState }
          mapCenter={ state.mapCenter }
          zoom={ state.zoom }
          layers={ state.layers }
          mapID={ state.mapID }
        />
      </div>
    </div>
  );
};

UgandaContainer.defaultProps = {
  padding: '50px'
};

export { UgandaContainer };
