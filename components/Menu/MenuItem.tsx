import React, { FunctionComponent } from 'react';
import { ListContent } from './ListContent';

interface SpotlightMenuItem {
  title: string;
  region?: string;
  level?: number;
  children?: [];
}

interface MenuItemNode {
  key: number;
  item: SpotlightMenuItem;
}

const MenuItem: FunctionComponent<MenuItemNode> = ({ key, item }) => {
  const renderListItem = (item: SpotlightMenuItem, index: number): JSX.Element => (
    <li className="countries-menu-list__countries js-profile-country-item" key={index}>
      <ListContent item={item} />
    </li>
  );

  return <span>{renderListItem(item, key)}</span>;
};

export { MenuItem };
