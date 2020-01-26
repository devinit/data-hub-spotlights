import React, { FunctionComponent, useEffect, useState } from 'react';
import { Select } from '../Select';
import { Map } from '../Map/Map';
import kenyanCounties from './geoJSON/kenyan-counties.json';
import kenyaSubcounties from './geoJSON/kenya-subcounty-proposal.json';
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
  zoom: number;
  layer: string;
  mapID: string;
}

const KenyaContainer: FunctionComponent<MapContainerProps> = ({ padding }) => {
  const [ state, setState ] = useState<State>({
    leaflet: {},
    selectedDistrict: '',
    boundaryType: 'all',
    subcountyDropdownOptions: [],
    selectedSubcounty: '',
    mapCenter: new L.LatLng(0.2601, 37.2757),
    zoom: 7,
    layer: 'https://api.mapbox.com/styles/v1/davidserene/ck56hj7h10o861clbgsqu7h88/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGF2aWRzZXJlbmUiLCJhIjoiUkJkd1hGWSJ9.SCxMvCeeovv99ZDnpfpNwA',
    mapID: 'map2'
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

  function loadCountySelect(districts: any) {
    const options = [];
    for (const district in districts.features) {
      if (districts.features) {
        options.push({
          value: districts.features[district].properties.COUNTY,
          label: districts.features[district].properties.COUNTY
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
          value: subcounties[subcounty].properties.ADMIN2,
          label: subcounties[subcounty].properties.ADMIN2
        });
      }
    }

    return options;
  }

  function handleDistrictChange(selectedOption: any) {
    const districtSubcounties = findSelectedDistrictSubcounties(selectedOption.value, kenyaSubcounties);
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
          color: '#00008b',
          weight: 1,
          opacity: 0.65
        }
      });
      layer.addTo(state.map);
    }
  }

  function showAllUgandaDistricts() {
    redrawMap(kenyanCounties);
  }

  function showOneUgandaDistrict() {
    const districtSubcounties = findSelectedDistrictSubcounties(state.selectedDistrict, kenyaSubcounties);
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
      ], 8);
    }
  }

  function showUgandaDistrictSubcounties() {
    const districtSubcounties = findSelectedDistrictSubcounties(state.selectedDistrict, kenyaSubcounties);
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
        const current_district = subcounties[subcounty].properties.ADMIN1;
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
        const similarity = distance(state.selectedDistrict.toLowerCase(), 'isiolo');
        const coordinates_array = (similarity > 0.9) ?
        districtSubcounties[key].geometry.coordinates[0][0] : districtSubcounties[key].geometry.coordinates[0];
        for (const item in coordinates_array) {
          if (coordinates_array[item] instanceof Array) {
            console.log('Value is ' + JSON.stringify(coordinates_array[item]));
            points.push(turf.point(coordinates_array[item]));
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
        <Select options={ loadCountySelect(kenyanCounties) } onChange={ handleDistrictChange } />
      </div>
      <div style={ { margin: '10px' } }>
        <Select options={ state.subcountyDropdownOptions } onChange={ handleSubcountyChange } />
      </div>
      <div style={ { padding } }>
        <Map
          saveMapState={ initialiseMapState }
          mapCenter={ state.mapCenter }
          zoom={ state.zoom }
          layer={ state.layer }
          mapID={ state.mapID }
        />
      </div>
    </div>
  );
};

KenyaContainer.defaultProps = {
  padding: '50px'
};

export { KenyaContainer };
