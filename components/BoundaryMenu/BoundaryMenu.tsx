import React, { FunctionComponent, useState, ReactNode } from 'react';
import {
  SpotlightMenu,
  SpotlightMenuToggle,
  SpotlightMenuList,
  SpotlightMenuListItem,
  MenuListItem
} from '../SpotlightMenu';
import SpotlightMenuNav from '../SpotlightMenu/SpotlightMenuNav';
import { SpotlightBoundary, SpotlightLocation } from '../../utils';

interface BoundaryMenuProps {
  boundaries: SpotlightBoundary[];
  countryName: string;
  defaultLocation?: SpotlightLocation;
  onSelectLocation?: (location?: MenuListItem) => void;
}

const BoundaryMenu: FunctionComponent<BoundaryMenuProps> = ({ countryName, onSelectLocation, ...props }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeItem, setActiveItem] = useState(props.defaultLocation ? props.defaultLocation.name : countryName);

  const onShowMenu = (): void => setShowMenu(!showMenu);
  const onShowAll = (): void => {
    onShowMenu();
    setActiveItem(countryName);
    if (onSelectLocation) {
      onSelectLocation();
    }
  };
  const onView = (_event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, location: MenuListItem): void => {
    setActiveItem(location.label);
    setShowMenu(false);
    if (onSelectLocation) {
      onSelectLocation(location);
    }
  };

  const renderMenuItems = (data: SpotlightBoundary[], depth = 1, setActive: (_id: string) => void): ReactNode =>
    data.map((boundary, index: number) => (
      <SpotlightMenuListItem
        key={index}
        item={{ label: boundary.name, value: boundary.geocode }}
        depth={depth}
        viewable={boundary.geocode.indexOf('d') > -1}
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
      <SpotlightMenuNav caption={countryName} active={showMenu} onClick={onShowMenu} onShowAll={onShowAll}>
        <SpotlightMenuList classNames="countries-menu-list__content">
          {renderMenuItems(props.boundaries, 1, (item: string) => setActiveItem(item))}
        </SpotlightMenuList>
      </SpotlightMenuNav>
    </SpotlightMenu>
  );
};

export { BoundaryMenu };
