import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { SubCounty } from './SubCounty';

interface SubcountyType {
  name: string;
}

interface DistrictItemNode {
  district: any;
  subcounties: SubcountyType[];
}

const DistrictItem: FunctionComponent<DistrictItemNode> = ({ district, subcounties }) => {
  const [showSubcounty, showSubcountyMenu] = useState(false);

  function handleDistrictClick() {
    showSubcountyMenu(!showSubcounty);
  }

  return (
    <li className="countries-menu-list--has-children js-profile-subregion-item">
      <a
        onClick={handleDistrictClick}
        href="#"
        className={classNames(
          'countries-menu-list__item countries-menu-list__item--parent-second js-menu-item js-search-item',
          {
            active: showSubcounty,
            'countries-menu-list__item--open': showSubcounty
          }
        )}
        data-has-children="1"
        title={'View ' + district.name}
      >
        {district.name}
      </a>
      <a
        href="#profile"
        aria-hidden="true"
        className="countries-menu__profile countries-menu__link js-profile-item"
        title="View County A"
      >
        View
      </a>
      <SubCounty subcounties={subcounties} showSubCounty={showSubcounty} />
    </li>
  );
};

export { DistrictItem };
