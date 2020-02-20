import React, { FunctionComponent, MouseEvent, useState } from 'react';
import classNames from 'classnames';
import { Region } from './Region';
import { RegionItem } from './RegionItem';

interface MenuNode {
  title?: string;
}

const Menu: FunctionComponent<MenuNode> = ({ title }) => {
    const [ showParentNav, toggleParentNav ] = useState(false);
    const [ showNextNav, showNextNavMenu ] = useState(false);

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
          <nav
            onClick={ toggleRegionsLevelOne }
            className={ classNames('countries-menu-list js-countries-menu-trigger', { inactive: showParentNav }) }
          >
          <a className="countries-menu-list__item countries-menu-list__parent" href="#"><span>Uganda</span></a>
          </nav>
          <nav
            className={ classNames('countries-menu-list animated', { inactive: !showNextNav }) }
          >
            <a
              onClick={ toggleRegionsLevelTwo }
              className={ classNames('countries-menu-list__item countries-menu-list__parent',
              { inactive: !showNextNav }) }
              href="#"
            >
              <span>{ title }</span>
            </a>
            <a
              href="#"
              className="countries-menu__profile countries-menu__link js-profile-item"
              title="View Uganda"
            >
              View
            </a>

            <Region>
              <RegionItem regionTitle="Central Region" />
              <RegionItem regionTitle="Western Region" />
              <RegionItem regionTitle="Eastern Region" />
              <RegionItem regionTitle="Northern Region" />
            </Region>

          </nav>
        </div>
    );
};
export { Menu };
