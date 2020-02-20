import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

interface MenuItem {
  name: string;
}

interface SubCountyNode {
  subcounties: MenuItem[];
  showSubCounty: boolean;
}

const SubCounty: FunctionComponent<SubCountyNode> = ({ subcounties, showSubCounty }) => {
  return (
    <ul
      className={classNames('js-profile-country-list', { 'countries-menu-list--selected': showSubCounty })}
      style={{ display: showSubCounty ? 'block' : 'none' }}
    >
      {subcounties.map((subcounty, index) => {
        return (
          <li key={index} className="countries-menu-list__countries js-profile-country-item">
            <a
              href="#"
              className="countries-menu-list__item countries-menu-list__item--parent-sixth js-search-item"
              data-has-children="1"
              title={'View ' + subcounty.name}
            >
              {subcounty.name}
            </a>
            <a
              href="#profile"
              aria-hidden="true"
              className="countries-menu__profile countries-menu__link js-profile-item"
              title="View County A"
            >
              View
            </a>
          </li>
        );
      })}
    </ul>
  );
};
export { SubCounty };
