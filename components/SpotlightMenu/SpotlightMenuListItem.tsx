import classNames from 'classnames';
import React, { Children, FunctionComponent, cloneElement, isValidElement, useState } from 'react';

interface ComponentProps {
  item: MenuListItem;
  depth?: number;
  viewable?: boolean;
  active?: boolean;
  onView?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, item: MenuListItem) => void;
}

export interface MenuListItem {
  label: string;
  value: string;
}

const SpotlightMenuListItem: FunctionComponent<ComponentProps> = ({ item, children, depth, active, ...props }) => {
  const [open, setOpen] = useState(false);
  const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.stopPropagation();
    if (props.viewable && props.onView) {
      props.onView(event, item);
    }
    setOpen(!open);
  };

  return (
    <li
      className={classNames({
        'countries-menu-list--has-children': children,
        'countries-menu-list__countries': !children,
        'js-profile-country-item': !children,
      })}
    >
      <a
        className={classNames('countries-menu-list__item js-menu-item js-search-item', {
          active,
          'countries-menu-list__item--open': open && children,
          'countries-menu-list__item--parent-first': depth === 1,
          'countries-menu-list__item--parent-second': depth === 2,
          'countries-menu-list__item--parent-third': depth === 3,
          'countries-menu-list__item--parent-fourth': depth === 4,
          'countries-menu-list__item--parent-fifth': depth === 5,
          'countries-menu-list__item--parent-sixth': depth === 6,
        })}
        onClick={onClick}
        data-testid="spotlight-menu-list-item-link"
      >
        {item.label.toLowerCase()}
        <style jsx>{`
          :before {
            display: ${children ? 'inline-block' : 'none'};
          }
        `}</style>
      </a>
      {Children.map(children, (child) => isValidElement(child) && cloneElement(child, { active: open }))}
    </li>
  );
};

SpotlightMenuListItem.defaultProps = { depth: 1, viewable: true, active: false };

export { SpotlightMenuListItem };
