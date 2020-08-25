import React, { FunctionComponent, ReactNode, useState } from 'react';
import classNames from 'classnames';
import { NavigationItem } from '../DefaultLayout';
import { NavigationItem as NavigationListItem } from './NavigationItem';

export interface PrimaryNavigationProps {
  items: NavigationItem[];
}

const PrimaryNavigation: FunctionComponent<PrimaryNavigationProps> = ({ items }) => {
  const [showMenu, setShowMenu] = useState(false);
  const renderNavigationItems = (): ReactNode =>
    items.map((item) => (
      <NavigationListItem key={item.title} title={item.title} active={item.active} url={item.full_url} />
    ));

  const onToggleMenu = (): void => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <button
        role="button"
        className={classNames('navigation-primary-toggle', { 'navigation-primary-toggle--active': showMenu })}
        id="navigation-primary-toggle"
        data-testid="navigation-primary-toggle"
        onClick={onToggleMenu}
      >
        <span>Menu</span>
      </button>
      <nav
        className={classNames('navigation-primary', { 'navigation-primary--active': showMenu })}
        role="navigation"
        id="navigation-primary"
        data-testid="navigation-primary"
      >
        <ul className="navigation-primary__items" data-testid="navigation-primary-ul">
          {renderNavigationItems()}
        </ul>
      </nav>
    </>
  );
};

export { PrimaryNavigation };
