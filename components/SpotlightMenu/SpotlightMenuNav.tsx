import classNames from 'classnames';
import React, { Children, FunctionComponent, isValidElement, cloneElement } from 'react';

interface ComponentProps {
  active?: boolean;
  onClick?: () => void;
  caption: string;
  onShowAll?: () => void;
}

const SpotlightMenuNav: FunctionComponent<ComponentProps> = ({ active, caption, children, onClick, onShowAll }) => {
  return (
    <nav className={classNames('countries-menu-list animated', { inactive: !active })}>
      <a
        className="countries-menu-list__item countries-menu-list__parent countries-menu-list__item--open js-countries-menu-trigger"
        onClick={onClick}
      >
        {caption}
      </a>
      <a
        className={classNames('countries-menu__profile countries-menu__link js-profile-item', { hide: !onShowAll })}
        aria-hidden="true"
        title={`View ${caption}`}
        onClick={onShowAll}
        data-testid="spotlight-nav-view"
      >
        View
      </a>
      <style jsx>{`
        cursor: pointer;
      `}</style>
      {Children.map(children, (child) => isValidElement(child) && cloneElement(child, { active }))}
    </nav>
  );
};

export default SpotlightMenuNav;
