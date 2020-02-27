import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface BannerProps {
  thin?: boolean;
}

const Banner: FunctionComponent<BannerProps> = ({ children, thin }) => {
  return (
    <div
      className={classNames('spotlight-banner', {
        'spotlight-banner--alt': thin
      })}
    >
      {children}
    </div>
  );
};
export { Banner };
