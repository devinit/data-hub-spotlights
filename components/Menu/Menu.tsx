import React, { FunctionComponent, MouseEvent, useState } from 'react';
import classNames from 'classnames';
import { Collapse } from 'react-collapse';
import { Region } from './Region';
import { RegionItem } from './RegionItem';

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

          <Region>
            <RegionItem key="central" regionTitle="Central Region" items={items} />
            <RegionItem key="western" regionTitle="Western Region" items={items} />
            <RegionItem key="eastern" regionTitle="Eastern Region" items={items} />
            <RegionItem key="northern" regionTitle="Northern Region" items={items} />
          </Region>
        </nav>
      </Collapse>
    </div>
  );
};
export { Menu };
