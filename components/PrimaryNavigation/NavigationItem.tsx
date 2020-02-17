import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

export interface NavigationItemProps {
  title: string;
  active: boolean;
  url: string;
}

const NavigationItem: FunctionComponent<NavigationItemProps> = ({ active, title, url }) => {
  return (
    <li className={classNames('navigation-primary__item', { 'navigation-primary__item--active': active })}>
      <a href={url}>{title}</a>
    </li>
  );
};

export { NavigationItem };
