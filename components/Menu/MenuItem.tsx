import React, { FunctionComponent, useEffect, useState } from 'react';
import classNames from 'classnames';

export interface SpotlightMenuItem {
  title: string;
  url?: string;
  children?: SpotlightMenuItem[];
  onClick?: () => void;
}

interface MenuItemNode {
  region: string;
  showDistrict: boolean;
  items: SpotlightMenuItem[];
}

const MenuItem: FunctionComponent<MenuItemNode> = ({ showDistrict, items }) => {
  const [show, toggleMenu] = useState(false);
  const menuClasses = [
    'countries-menu-list__item--parent-second',
    'countries-menu-list__item--parent-third',
    'countries-menu-list__item--parent-fourth'
  ];

  useEffect(() => {
    toggleMenu(showDistrict);
  }, [showDistrict]);

  function loadClass(item: any) {
    return menuClasses[item.level];
  }

  const renderListItem = (item: SpotlightMenuItem, index: number) => (
    <li className="countries-menu-list__countries js-profile-country-item" key={index}>
      <a
        href="#"
        className={classNames('countries-menu-list__item ' + loadClass(item) + ' js-menu-item js-search-item', {
          active: show,
          'countries-menu-list__item--open': show
        })}
        data-has-children="1"
        title={'View ' + item.title}
      >
        {item.title}
      </a>

      <a
        href="#profile"
        aria-hidden="true"
        className="countries-menu__profile countries-menu__link js-profile-item"
        title="View County A"
      >
        View
      </a>
      {item.children ? (
        <ul
          className={classNames('js-profile-subregion-list', { 'countries-menu-list--selected': show })}
          style={{ display: show ? 'block' : 'none' }}
        >
          {item.children.map(renderListItem)}
        </ul>
      ) : null}
    </li>
  );

  const renderNavList = () => items.map(renderListItem);

  return (
    <ul
      className={classNames('js-profile-subregion-list', { 'countries-menu-list--selected': show })}
      style={{ display: show ? 'block' : 'none' }}
    >
      {renderNavList()}
    </ul>
  );
};

export { MenuItem };
