import * as distance from 'jaro-winkler';
import * as turf from '@turf/turf';

export function mergeCountiesToPopulation(counties: any, countyPopulation: any) {
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

export function mergeSubCountiesToPopulation(subCounties: any, subcountyPopulation: any) {
  const data: any[] = [];
  for (const key1 in subCounties.features) {
    if (subCounties.features[key1]) {
      for (const key2 in subcountyPopulation) {
        if (subcountyPopulation[key2]) {
          const similarity = distance(
            subCounties.features[key1].properties.ADMIN2.trim().toLowerCase(),
            subcountyPopulation[key2].subcounty.trim().toLowerCase()
          );
          if (similarity === 1) {
            const holder = subCounties.features[key1];
            data.push({
              ...holder,
              properties: {
                ...holder.properties,
                population: subcountyPopulation[key2].population
              }
            });
          }
        }
      }
    }
  }

  return data;
}

export function loadCountySelect(counties: any) {
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

export function loadSubcountySelect(subcounties: any[]) {
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

export function findSelectedCountySubcounties(district: string, allSubcounties: any) {
  const selectedGeometry = [];
  const subcounties = allSubcounties.features ? allSubcounties.features : allSubcounties;
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

export function getCenterOfFeatureCollection(subCounties: any[]) {
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

export function getCenterOfSubcountyFeatureCollection(subCounties: any) {
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
