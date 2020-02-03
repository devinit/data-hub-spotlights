import React, { FunctionComponent, useEffect, useState } from 'react';
import { Select } from '../Select';
import { Map } from '../Map/Map';
import ugandaDistricts from './geoJSON/district.json';
import ugandasubcounties from './geoJSON/subcounty.json';
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
  selectedDistrict: string;
  boundaryType: string;
  subcountyDropdownOptions: any[];
  selectedSubcounty: string;
  mapCenter?: L.LatLng;
  zoom?: number;
  layers: L.TileLayer[];
  ugDistrictsLayer?: L.GeoJSON;
}

const UgandaContainer: FunctionComponent<MapContainerProps> = ({ padding }) => {
  const [ state, setState ] = useState<State>({
    leaflet: {},
    selectedDistrict: '',
    boundaryType: 'all',
    subcountyDropdownOptions: [],
    selectedSubcounty: '',
    mapCenter: new L.LatLng(1.176, 32.1225),
    layers: [
      L.tileLayer('https://api.mapbox.com/styles/v1/davidserene/ck56hj7h10o861clbgsqu7h88/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGF2aWRzZXJlbmUiLCJhIjoiUkJkd1hGWSJ9.SCxMvCeeovv99ZDnpfpNwA', {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
      })
    ]
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
    0,
    10000,
    20000,
    150000,
    350000,
    500000,
    750000,
    1500000
  ];

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
        style,
        onEachFeature
      });
      layer.addTo(state.map);

      return layer;
    }
  }

  function style(feature: any) {
    const population = (feature.properties.Population) ? feature.properties.Population : feature.properties.Popn;

    return {
        fillColor: getColor(population),
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
    };
  }

  function getColor(d: number) {
    return d > 1500000 ? '#99000d' :
        d > 750000 ? '#cb181d' :
        d > 500000 ? '#ef3b2c' :
        d > 350000 ? '#fb6a4a' :
        d > 150000 ? '#fc9272' :
        d > 20000 ? '#fcbba1' :
        d > 10000 ? '#fee0d2' :
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

  function addPopup(LatLng: L.LatLng, e: L.LayerEvent) {
    const location: string = e.target.feature.properties.DNAME2014 ? e.target.feature.properties.DNAME2014 :
    e.target.feature.properties.SName2016;
    const popup: L.Popup = L.popup({ autoClose: false })
    .setLatLng(LatLng)
    .setContent('<b>Population</b><br/>' + location + '<br/>' +
    (e.target.feature.properties.Population ? e.target.feature.properties.Population :
      e.target.feature.properties.Popn));
    if (state.map) {
      state.map.addLayer(popup);
    }
  }

  function resetFeature(e: any) {
      if (state.map) {
        state.map.eachLayer(layer => {
          if (layer instanceof L.Popup) {
            layer.remove();
          }
        });
      }
      if (state.ugDistrictsLayer) {
        state.ugDistrictsLayer.resetStyle(e.target);
      }
  }

  function showAllUgandaDistricts() {
    state.ugDistrictsLayer = redrawMap(ugandaDistricts);
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
      <div style={ { padding, float: 'right', width: '70%' } }>
        <Map
          saveMapState={ initialiseMapState }
          mapCenter={ state.mapCenter }
          zoom={ state.zoom }
          layers={ state.layers }
        />
      </div>
      <div style={ { float: 'left', padding: '20px', width: '30%', backgroundColor: '#fff' } }>
          <Legend>
            {
              grades.map((grade, index) => {
                return <LegendItem key={ index } bgColor={ color[index] }>{ grade }{ (grades[index + 1])
                  ? ' - ' + (grades[index + 1]) : ' > ' }
                  </LegendItem>;
              })
            }
            <LegendItem>no data / not applicable</LegendItem>;
          </Legend>
        </div>
    </div>
  );
};

UgandaContainer.defaultProps = {
  padding: '50px'
};

export { UgandaContainer };
