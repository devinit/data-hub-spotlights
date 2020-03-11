import React, { FunctionComponent, useEffect, useState } from 'react';
import { SpotlightMenu, SpotlightMenuToggle, SpotlightMenuList, SpotlightMenuListItem } from '../SpotlightMenu';
import SpotlightMenuNav from '../SpotlightMenu/SpotlightMenuNav';
import { getBoundariesByCountryCode } from '../../utils';

interface SpotlightMenuWithDataProps {
  countryName: string;
  countryCode: string;
  spotlightMenu?: boolean;
  onWidgetClick: (widgetState: boolean, location: any) => void;
}

const SpotlightMenuWithData: FunctionComponent<SpotlightMenuWithDataProps> = ({
  countryName,
  countryCode,
  spotlightMenu,
  onWidgetClick
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeItem, setActiveItem] = useState(countryName);
  const [boundaries, setBoundaries] = useState();
  const onShowMenu = (): void => setShowMenu(!showMenu);
  const onShowAll = (): void => {
    onShowMenu();
    setActiveItem(countryName);
  };

  useEffect(() => {
    getBoundariesByCountryCode(countryCode).then(boundaries => {
      setBoundaries(boundaries);
    });
  }, [countryCode]);

  const renderMenuItems = (data: any, depth = 1, setActive: (_id: string) => void) => {
    return data.map((location: any, index: number) => {
      const onView = (_event: any, item: any) => {
        setShowMenu(false);
        onWidgetClick(false, { name: item.label, geocode: item.value });
      };
      return (
        <SpotlightMenuListItem
          key={index}
          item={{ label: location.name, value: location.geocode }}
          depth={depth}
          onView={onView}
        >
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
          {renderMenuItems(boundaries, 1, (item: string) => setActiveItem(item))}
        </SpotlightMenuList>
      </SpotlightMenuNav>
    </SpotlightMenu>
  ) : (
    <span />
  );
};

export { SpotlightMenuWithData };
