import React, { FunctionComponent, ReactNode, useContext, useState, useEffect } from 'react';
import { LocationContext, SpotlightBoundary, CountryContext } from '../../utils';
import {
  MenuListItem,
  SpotlightMenu,
  SpotlightMenuList,
  SpotlightMenuListItem,
  SpotlightMenuToggle,
} from '../SpotlightMenu';
import SpotlightMenuNav from '../SpotlightMenu/SpotlightMenuNav';

interface BoundaryMenuProps {
  boundaries: SpotlightBoundary[];
  onSelectLocation?: (location?: MenuListItem) => void;
  canReset?: boolean;
}

const BoundaryMenu: FunctionComponent<BoundaryMenuProps> = ({ onSelectLocation, ...props }) => {
  const location = useContext(LocationContext);
  const { countryName } = useContext(CountryContext);
  const [showMenu, setShowMenu] = useState(false);
  const [activeItem, setActiveItem] = useState(location ? location.name : countryName);
  useEffect(() => setActiveItem(location ? location.name : countryName), [location]);

  const onShowMenu = (): void => setShowMenu(!showMenu);
  const onShowAll = (): void => {
    onShowMenu();
    if (onSelectLocation) {
      onSelectLocation();
    } else {
      setActiveItem(countryName);
    }
  };
  const onView = (_event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, location: MenuListItem): void => {
    setShowMenu(false);
    if (onSelectLocation) {
      onSelectLocation(location);
    } else {
      setActiveItem(location.label);
    }
  };

  const renderMenuItems = (data: SpotlightBoundary[], depth = 1, setActive: (_id: string) => void): ReactNode =>
    data.map((boundary, index: number) => (
      <SpotlightMenuListItem
        key={index}
        item={{ label: boundary.name, value: boundary.geocode }}
        depth={depth}
        viewable={boundary.geocode.indexOf('d') > -1}
        active={boundary.name.toLowerCase() === activeItem.toLowerCase()}
        onView={onView}
      >
        {boundary.children && boundary.geocode.indexOf('d') === -1 ? ( // TODO: allow sub-county data once it's acquired
          <SpotlightMenuList>{renderMenuItems(boundary.children, depth + 1, setActive)}</SpotlightMenuList>
        ) : null}
      </SpotlightMenuListItem>
    ));

  return (
    <SpotlightMenu>
      <SpotlightMenuToggle caption={activeItem.toLowerCase()} show={!showMenu} onClick={onShowMenu} />
      <SpotlightMenuNav
        caption={countryName}
        active={showMenu}
        onClick={onShowMenu}
        onShowAll={props.canReset ? onShowAll : undefined}
      >
        <SpotlightMenuList classNames="countries-menu-list__content">
          {renderMenuItems(props.boundaries, 1, (item: string) => setActiveItem(item))}
        </SpotlightMenuList>
      </SpotlightMenuNav>
    </SpotlightMenu>
  );
};

BoundaryMenu.defaultProps = { canReset: true };

export { BoundaryMenu };
