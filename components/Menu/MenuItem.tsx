import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';

interface SpotlightMenuItem {
  title: string;
  region?: string;
  level?: number;
  children?: [];
}

interface MenuItemNode {
  key: number;
  item: SpotlightMenuItem;
}

const MenuItem: FunctionComponent<MenuItemNode> = ({ key, item }) => {
  const [show, toggleMenu] = useState(false);
  const menuClasses = [
    'countries-menu-list__item--parent-second',
    'countries-menu-list__item--parent-third',
    'countries-menu-list__item--parent-fourth'
  ];

  function loadClass(item: any): string {
    return menuClasses[item.level];
  }

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    event.stopPropagation();
    toggleMenu(!show);
  }

  const renderItem = (item: SpotlightMenuItem): JSX.Element => (
    <span>
      <a
        onClick={handleClick}
        href="#"
        className={classNames('countries-menu-list__item ' + loadClass(item) + ' js-menu-item js-search-item', {
          active: show,
          'countries-menu-list__item--open': show
        })}
        title={'View ' + item.title}
      >
        {item.title}
      </a>

      <a href="#profile" className="countries-menu__profile countries-menu__link js-profile-item" title="View">
        View
      </a>
    </span>
  );

  const renderListItem = (item: SpotlightMenuItem, index: number): JSX.Element => (
    <li className="countries-menu-list__countries js-profile-country-item" key={index}>
      {renderItem(item)}
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

  return <span>{renderListItem(item, key)}</span>;
};

export { MenuItem };
