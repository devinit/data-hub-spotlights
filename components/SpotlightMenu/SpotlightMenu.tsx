import React, { FunctionComponent, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Mmenu from 'mmenu-js';
import 'mmenu-js/dist/mmenu.css';

interface SpotlightMenuProps {
  active?: boolean;
  items: SpotlightMenuItem[];
}

export interface SpotlightMenuItem {
  title: string;
  url?: string;
  children?: SpotlightMenuItem[];
  onClick?: () => void;
}

const SpotlightMenu: FunctionComponent<SpotlightMenuProps> = ({ active, items }) => {
  const menuNode = useRef(null);

  useEffect(() => {
    if (menuNode && menuNode.current) {
      new Mmenu(menuNode.current, { offCanvas: false }, { classNames: { selected: 'active' } }); // tslint:disable-line
    }
  }, []);

  const renderItem = (item: SpotlightMenuItem) =>
    item.url ? (
      <a href={item.url} onClick={item.onClick}>
        {item.title}
      </a>
    ) : (
      <span onClick={item.onClick}>{item.title}</span>
    );

  const renderListItem = (item: SpotlightMenuItem, index: number) => (
    <li key={index}>
      {renderItem(item)}
      {item.children ? <ul>{item.children.map(renderListItem)}</ul> : null}
    </li>
  );

  const renderNavList = () => <ul>{items.map(renderListItem)}</ul>;

  return (
    <nav
      id="menu"
      className={classNames('spotlight-menu mm-menu', { 'spotlight-menu--active': active })}
      ref={menuNode}
    >
      {renderNavList()}
    </nav>
  );
};

export { SpotlightMenu };
