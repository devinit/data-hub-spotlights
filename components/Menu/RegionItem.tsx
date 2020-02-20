import React, { FunctionComponent, useState } from 'react';
import { District } from './District';
import classNames from 'classnames';

interface RegionItemNode {
  regionTitle: string;
}

const RegionItem: FunctionComponent<RegionItemNode> = ({ regionTitle }) => {
  const [ showDistrict, showDistrictMenu ] = useState(false);

  function handleRegionClick() {
    showDistrictMenu(!showDistrict);
  }

  return (
    <li className="countries-menu-list--has-children js-profile-region-item">
      <a
        onClick={ handleRegionClick }
        href="#"
        data-has-children="1"
        className={ classNames('countries-menu-list__item js-menu-item js-search-item',
          {
            'active': showDistrict,
            'countries-menu-list__item--open': showDistrict
          }) }
      >
        { regionTitle }
      </a>
      <a
        href="#profile"
        className="countries-menu__profile countries-menu__link js-profile-item"
        aria-hidden="true"
      >
        View
      </a>
      <District region={ regionTitle } showDistrict={ showDistrict }/>
    </li>
  );
};
export { RegionItem };
