import React, { FunctionComponent } from 'react';
import { v1 as uuid } from 'uuid';
import classNames from 'classnames';
import { DistrictItem } from './DistrictItem';

const allDistricts = [
  {
    region: 'central',
    name: 'Masaka',
    subcounties: [
      {
        name: 'bulindo'
      },
      {
        name: 'Busega'
      },
      {
        name: 'Kolir'
      }
    ]
  },
  {
    region: 'central',
    name: 'Luwero',
    subcounties: [
      {
        name: 'Copa'
      },
      {
        name: 'Antioch'
      },
      {
        name: 'Sema'
      }
    ]
  }
];

interface DistrictNode {
  region: string;
  showDistrict: boolean;
}

const District: FunctionComponent<DistrictNode> = ({ region, showDistrict }) => {
  return (
    <ul
      className={classNames('js-profile-subregion-list', { 'countries-menu-list--selected': showDistrict })}
      style={{ display: showDistrict ? 'block' : 'none' }}
    >
      {allDistricts.map(district => {
        if (region.toLowerCase().includes(district.region)) {
          return <DistrictItem district={district} subcounties={district.subcounties} key={uuid()} />;
        }
      })}
    </ul>
  );
};

export { District };
