import classNames from 'classnames';
import React, { Children, FunctionComponent, isValidElement } from 'react';
import { SpotlightHeading } from '../SpotlightHeading';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SpotlightShare } from '../SpotlightShare';
import { SidebarContent } from './SidebarContent';

interface ComponentProps {
  className?: string;
  width?: string;
}

const SpotlightSidebar: FunctionComponent<ComponentProps> = ({ children, className, width }) => {
  return (
    <div className={classNames('spotlight__aside', className)}>
      {Children.map(children, child =>
        isValidElement(child) &&
        (child.type === SidebarContent ||
          child.type === SpotlightHeading ||
          child.type === SpotlightInteractive ||
          child.type === SpotlightShare)
          ? child
          : null
      )}
      <style jsx>{`
        min-height: 500px;
        ${width ? `width: ${width};` : ''}
      `}</style>
    </div>
  );
};

export { SpotlightSidebar };
