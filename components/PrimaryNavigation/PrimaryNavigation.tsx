import React, { FunctionComponent } from 'react';
import { NavigationItem } from '../DefaultLayout';
import { NavigationItem as NavigationListItem } from './NavigationItem';

export interface PrimaryNavigationProps {
  items: NavigationItem[];
}

const PrimaryNavigation: FunctionComponent<PrimaryNavigationProps> = ({ items }) => {
  const renderNavigationItems = () => {
    return items.map(item => (
      <NavigationListItem key={item.title} title={item.title} active={item.active} url={item.full_url} />
    ));
  };

  return (
    <>
      <button role="button" className="navigation-primary-toggle" id="navigation-primary-toggle">
        <span>Menu</span>
      </button>
      <nav className="navigation-primary" role="navigation" id="navigation-primary">
        <ul className="navigation-primary__items" data-testid="navigation-primary-ul">
          {renderNavigationItems()}
        </ul>
      </nav>
    </>
  );
};

export { PrimaryNavigation };
