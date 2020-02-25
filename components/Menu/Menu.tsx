import React, { FunctionComponent, MouseEvent, useState } from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-collapse';
import { MenuItem } from './MenuItem';

export interface MenuItems {
  title: string;
  region: string;
}

interface MenuNode {
  title?: string;
  items: MenuItems[];
}

const Menu: FunctionComponent<MenuNode> = ({ title, items }) => {
  const [showParentNav, toggleParentNav] = useState(true);
  const [showNextNav, showNextNavMenu] = useState(false);

  const toggleRegionsLevelOne = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    toggleParentNav(!showParentNav);
    showNextNavMenu(!showNextNav);
  };

  const toggleRegionsLevelTwo = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    toggleParentNav(!showParentNav);
    showNextNavMenu(!showNextNav);
  };

  return (
    <div>
      <Collapse isOpened={showParentNav}>
        <nav onClick={toggleRegionsLevelOne} className="countries-menu-list js-countries-menu-trigger">
          <a className="countries-menu-list__item countries-menu-list__parent" href="#">
            <span>Uganda</span>
          </a>
        </nav>
      </Collapse>

      <Collapse isOpened={showNextNav}>
        <nav className="countries-menu-list animated">
          <a
            onClick={toggleRegionsLevelTwo}
            className={classNames('countries-menu-list__item countries-menu-list__parent', {
              'countries-menu-list__item--open': showNextNav
            })}
            href="#"
          >
            <span>{title}</span>
          </a>
          <a href="#" className="countries-menu__profile countries-menu__link js-profile-item" title="View Uganda">
            View
          </a>

          <ul
            className={classNames('js-profile-subregion-list', { 'countries-menu-list--selected': showNextNav })}
            style={{ display: showNextNav ? 'block' : 'none' }}
          >
            {items.map((item, index) => {
              return <MenuItem item={item} key={index} />;
            })}
          </ul>
        </nav>
      </Collapse>
    </div>
  );
};
export { Menu };
