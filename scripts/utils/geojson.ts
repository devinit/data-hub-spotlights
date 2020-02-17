import * as fs from 'fs';

const convertUgandaDistrictGeoJSON = (features: any[]): any[] =>
  features.map(({ geometry, type, properties }) => ({
    type,
    properties: {
      geocode: `UG.d${properties.DCODE2014}`,
      name: properties.DNAME2014,
      region: properties.Region
    },
    geometry
  }));

const getUgandaDistrictCodeByName = (districtName: string, features: any[]): number => {
  const district = features.find(feature => feature.properties.DNAME2014.toLowerCase() === districtName.toLowerCase());

  return district ? district.properties.DCODE2014 : districtName;
};

const convertUgandaSubCountyGeoJSON = (features: any[], districtFeatures: any[]): any[] =>
  features.map(({ geometry, type, properties }) => ({
    type,
    geometry,
    properties: {
      geocode: `UG.d${getUgandaDistrictCodeByName(properties.DName2016, districtFeatures)}.${properties.scode}`,
      name: properties.SName2016
    }
  }));

export const convertUG = (sourcePath: string) => {
  const districtJSON = JSON.parse(fs.readFileSync(`${sourcePath}UG/district.json`, 'utf8'));
  const subcountyGeoJSON = JSON.parse(fs.readFileSync(`${sourcePath}UG/subcounty.json`, 'utf8'));
  const convertedJSON = {
    type: districtJSON.type,
    features: [
      ...convertUgandaDistrictGeoJSON(districtJSON.features),
      ...convertUgandaSubCountyGeoJSON(subcountyGeoJSON.features, districtJSON.features)
    ]
  };
  fs.writeFile('UG.json', JSON.stringify(convertedJSON), 'utf8', err => {
    if (err) {
      throw err;
    }

    console.log('The file has been saved!');
  });
};
