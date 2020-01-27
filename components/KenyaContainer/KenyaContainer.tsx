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
  selectedCounty: string;
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
    selectedCounty: '',
    boundaryType: 'all',
    subcountyDropdownOptions: [],
    selectedSubcounty: '',
    mapCenter: new L.LatLng(0.2601, 37.2757),
    zoom: 6,
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
      showUgandaKenyaSubcounties();
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

  function showAllKenyaCounties() {
    redrawMap(kenyanCounties);
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
      ], 8);
    }
  }

  function showUgandaKenyaSubcounties() {
    const subCounties = findSelectedCountySubcounties(state.selectedCounty, kenyaSubcounties);
    clean_map();

    for (const subcounty in subCounties) {
      if (subCounties[subcounty]) {
        const similarity = distance(
          state.selectedSubcounty.toLowerCase(),
          subCounties[subcounty].properties.ADMIN2.toLowerCase()
        );
        if (similarity > 0.9) {
          redrawMap(subCounties[subcounty]);
          const center: any = getCenterOfSubcountyFeatureCollection(subCounties[subcounty]);
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

  function findSelectedCountySubcounties(district: string, allSubcounties: any) {
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

  function getCenterOfFeatureCollection(subCounties: any) {
    const points = [];
    for (const key in subCounties) {
      if (subCounties[key]) {
        const similarity = distance(state.selectedCounty.toLowerCase(), 'isiolo');
        const coordinates_array = (similarity > 0.9) ?
        subCounties[key].geometry.coordinates[0][0] : subCounties[key].geometry.coordinates[0];
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
    const coords = subCounties.geometry.coordinates[0][0];
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
        <Select options={ loadCountySelect(kenyanCounties) } onChange={ handleCountyChange } />
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
