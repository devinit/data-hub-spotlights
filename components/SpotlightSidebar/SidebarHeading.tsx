import React, { FunctionComponent } from 'react';

interface SidebarHeadingProps {
  heading?: string;
  onClick?: () => void;
}

const SidebarHeading: FunctionComponent<SidebarHeadingProps> = ({ heading, onClick }) => {
  return (
    <h2 className="spotlight__heading">
      {heading}
      <button data-testid="spotlight-menu-trigger" type="button" className="button button--minor" onClick={onClick}>
        <i role="presentation" aria-hidden="true" className="ico ico--20 ico-arrow-down-blank" />
      </button>
    </h2>
  );
};

export { SidebarHeading };
