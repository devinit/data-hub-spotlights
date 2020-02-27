import classNames from 'classnames';
import React, { Children, FunctionComponent, isValidElement } from 'react';
import { SpotlightHeading } from '../SpotlightHeading';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SidebarContent } from './SidebarContent';

const SpotlightSidebar: FunctionComponent<{ className?: string }> = ({ children, className }) => {
  return (
    <div className={classNames('spotlight__aside', className)}>
      {Children.map(children, child =>
        isValidElement(child) &&
        (child.type === SidebarContent || child.type === SpotlightHeading || child.type === SpotlightInteractive)
          ? child
          : null
      )}
      <style jsx>{`
        min-height: 500px;
      `}</style>
    </div>
  );
};

export { SpotlightSidebar };
