import * as turf from '@turf/turf';
import { FeatureCollection } from 'geojson';
import * as distance from 'jaro-winkler';
import { GeoJSON, LatLng, Map as LeafletMap } from 'leaflet';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { GeoJSONLayer, Map, TileLayer } from '../Map';
import { Select } from '../Select';
import ugandaDistricts from './geoJSON/district.json';
import ugandasubcounties from './geoJSON/subcounty.json';

interface MapContainerProps {
  padding?: string;
}

interface State {
  map?: LeafletMap;
  selectedDistrict: string;
  boundaryType: string;
  subcountyDropdownOptions: any[];
  selectedSubcounty: string;
  mapCenter?: LatLng;
  zoom?: number;
}

const UgandaContainer: FunctionComponent<MapContainerProps> = ({ padding }) => {
  const [ state, setState ] = useState<State>({
    selectedDistrict: '',
    boundaryType: 'all',
    subcountyDropdownOptions: [],
    selectedSubcounty: '',
    mapCenter: new LatLng(0.6976, 33.5825)
  });
  const [ geojson, setGeoJSON ] = useState<FeatureCollection | undefined>(undefined);

  useEffect(() => {
    addLayer();
  }, [ state ]);

  function initialiseMapState(map: any) {
    setState(prevState => ({ ...prevState, map }));
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
        if (layer instanceof GeoJSON) {
          map.removeLayer(layer);
        }
      });
    }
  }

  function showAllUgandaDistricts() {
    setGeoJSON(ugandaDistricts as FeatureCollection);
  }

  function showOneUgandaDistrict() {
    const districtSubcounties = findSelectedDistrictSubcounties(state.selectedDistrict, ugandasubcounties);
    clean_map();
    for (const key in districtSubcounties) {
      if (districtSubcounties[key]) {
        setGeoJSON(districtSubcounties[key]);
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
          setGeoJSON(districtSubcounties[subcounty]);
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
        <Map onCreate={ initialiseMapState } center={ state.mapCenter } zoom={ state.zoom }>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/davidserene/ck56hj7h10o861clbgsqu7h88/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGF2aWRzZXJlbmUiLCJhIjoiUkJkd1hGWSJ9.SCxMvCeeovv99ZDnpfpNwA"
            attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
          />
          <GeoJSONLayer
            geojson={ geojson }
            style={ {
              color: '#ffffff',
              weight: 1,
              opacity: 0.65
            } }
          />
        </Map>
      </div>
    </div>
  );
};

UgandaContainer.defaultProps = {
  padding: '50px'
};

export { UgandaContainer };
