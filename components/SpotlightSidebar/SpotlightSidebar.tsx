import classNames from 'classnames';
import React, { Children, FunctionComponent, isValidElement } from 'react';
import { SpotlightHeading } from '../SpotlightHeading';
import { SpotlightInteractive } from '../SpotlightInteractive';
import { SidebarContent } from './SidebarContent';

interface ComponentProps {
  className?: string;
  width?: string;
  height?: string;
}

const SpotlightSidebar: FunctionComponent<ComponentProps> = ({ children, className, width, height }) => {
  return (
    <div className={classNames('spotlight__aside', className)}>
      {Children.map(children, child =>
        isValidElement(child) &&
        (child.type === SidebarContent || child.type === SpotlightHeading || child.type === SpotlightInteractive)
          ? child
          : null
      )}
      <style jsx>{`
        ${height ? `min-height: ${height};` : ''}
        ${width ? `width: ${width};` : ''}
      `}</style>
    </div>
  );
};

export { SpotlightSidebar };
