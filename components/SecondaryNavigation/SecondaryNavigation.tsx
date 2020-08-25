import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { NavigationItem, NavigationItemProps } from './NavigationItem';

interface SecondaryNavigationProps {
  items?: NavigationItemProps[];
  className?: string;
}

const SecondaryNavigation: FunctionComponent<SecondaryNavigationProps> = ({ children, className, items }) => (
  <nav className={classNames('navigation-secondary', className)}>
    <ul className="navigation-secondary__items" data-testid="navigation-secondary-ul">
      {items?.map((item) => (
        <NavigationItem key={item.title} {...item} />
      ))}
      {children}
    </ul>
  </nav>
);

SecondaryNavigation.defaultProps = { items: [] };

export { SecondaryNavigation };
