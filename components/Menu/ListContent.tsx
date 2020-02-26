import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { MenuItem } from './MenuItem';

interface SpotlightMenuItem {
  title: string;
  region?: string;
  level?: number;
  children?: [];
}

interface ListContentNode {
  item: SpotlightMenuItem;
}

const ListContent: FunctionComponent<ListContentNode> = ({ item }) => {
  const [showUl, toggleUlMenu] = useState(false);
  const menuClasses = [
    'countries-menu-list__item--parent-second',
    'countries-menu-list__item--parent-third',
    'countries-menu-list__item--parent-fourth'
  ];

  function loadClass(item: any): string {
    return menuClasses[item.level];
  }

  function handleClick(): void {
    toggleUlMenu(!showUl);
  }

  const renderListContent = (item: SpotlightMenuItem): JSX.Element => (
    <React.Fragment>
      <a
        onClick={handleClick}
        href="#"
        className={classNames('countries-menu-list__item ' + loadClass(item) + ' js-menu-item js-search-item', {
          active: showUl,
          'countries-menu-list__item--open': showUl
        })}
        title={'View ' + item.title}
      >
        {item.title}
      </a>

      <a href="#profile" className="countries-menu__profile countries-menu__link js-profile-item" title="View">
        View
      </a>
      {item.children ? (
        <ul
          className={classNames('js-profile-subregion-list', { 'countries-menu-list--selected': showUl })}
          style={{ display: showUl ? 'block' : 'none' }}
        >
          {item.children.map((item, index) => {
            return <MenuItem item={item} key={index} />;
          })}
        </ul>
      ) : null}
    </React.Fragment>
  );

  return <React.Fragment>{renderListContent(item)}</React.Fragment>;
};

export { ListContent };
