import React, { FunctionComponent, MouseEvent, useState } from 'react';
import { Collapse } from 'react-collapse';
import { Region } from './Region';
import { RegionItem } from './RegionItem';

interface MenuNode {
  title?: string;
}

const Menu: FunctionComponent<MenuNode> = ({ title }) => {
    const [ showParentNav, toggleParentNav ] = useState(true);
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
          <Collapse isOpened={ showParentNav }>
            <nav
              onClick={ toggleRegionsLevelOne }
              className="countries-menu-list js-countries-menu-trigger"
            >
            <a className="countries-menu-list__item countries-menu-list__parent" href="#"><span>Uganda</span></a>
            </nav>
          </Collapse>

          <Collapse isOpened={ showNextNav }>
            <nav
              className="countries-menu-list animated"
            >
              <a
                onClick={ toggleRegionsLevelTwo }
                className="countries-menu-list__item countries-menu-list__parent"
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
          </Collapse>

        </div>
    );
};
export { Menu };
