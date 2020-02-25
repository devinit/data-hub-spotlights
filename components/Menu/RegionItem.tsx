import React, { FunctionComponent, useState } from 'react';
import { MenuItem } from './MenuItem';
import classNames from 'classnames';
import { MenuItems } from './Menu';

interface RegionItemNode {
  regionTitle: string;
  items: MenuItems[];
}

const RegionItem: FunctionComponent<RegionItemNode> = ({ regionTitle, items }) => {
  const [showDistrict, toggleDistrict] = useState(false);

  function handleClick() {
    toggleDistrict(!showDistrict);
    console.log('the district is ' + showDistrict);
  }

  return (
    <li className="countries-menu-list--has-children js-profile-region-item">
      <a
        onClick={handleClick}
        href="#"
        data-has-children="1"
        className={classNames('countries-menu-list__item js-menu-item js-search-item', {
          active: showDistrict,
          'countries-menu-list__item--open': showDistrict
        })}
      >
        {regionTitle}
      </a>
      <a href="#profile" className="countries-menu__profile countries-menu__link js-profile-item" aria-hidden="true">
        View
      </a>
      <MenuItem region={regionTitle} showDistrict={showDistrict} items={items} />
    </li>
  );
};
export { RegionItem };
