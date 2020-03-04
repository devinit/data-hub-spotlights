import React, { FunctionComponent, useState } from 'react';
import { SpotlightMenu, SpotlightMenuToggle, SpotlightMenuList, SpotlightMenuListItem } from '../SpotlightMenu';
import SpotlightMenuNav from '../SpotlightMenu/SpotlightMenuNav';
import ugBoundaries from '../../boundaries/UG.json';

interface SpotlightMenuWithDataProps {
  countryName: string;
  spotlightMenu?: boolean;
  onWidgetClick: (widgetState: boolean, tagName: string) => void;
}

const SpotlightMenuWithData: FunctionComponent<SpotlightMenuWithDataProps> = ({
  countryName,
  spotlightMenu,
  onWidgetClick
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeItem, setActiveItem] = useState(countryName);
  const onShowMenu = (): void => setShowMenu(!showMenu);
  const onShowAll = (): void => {
    onShowMenu();
    setActiveItem(countryName);
  };

  const renderMenuItems = (data: any, depth = 1, setActive: (_id: string) => void) => {
    return data.map((location: any, index: number) => {
      const onView = (_event: any, id: string) => {
        setActive(id);
        setShowMenu(false);
        onWidgetClick(false, id);
      };

      return (
        <SpotlightMenuListItem key={index} title={location.name} depth={depth} onView={onView}>
          {location.children ? (
            <SpotlightMenuList>{renderMenuItems(location.children, depth + 1, setActive)}</SpotlightMenuList>
          ) : null}
        </SpotlightMenuListItem>
      );
    });
  };

  return spotlightMenu === true ? (
    <SpotlightMenu>
      <SpotlightMenuToggle caption={activeItem} show={!showMenu} onClick={onShowMenu} />
      <SpotlightMenuNav caption={countryName} active={showMenu} onClick={onShowMenu} onShowAll={onShowAll}>
        <SpotlightMenuList classNames="countries-menu-list__content">
          {renderMenuItems(ugBoundaries, 1, (item: string) => setActiveItem(item))}
        </SpotlightMenuList>
      </SpotlightMenuNav>
    </SpotlightMenu>
  ) : (
    <span />
  );
};

export { SpotlightMenuWithData };
