import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

const SpotlightBanner: FunctionComponent<{ header?: boolean }> = ({ children, header }) => (
  <div className={classNames('spotlight-banner', { 'spotlight-banner--header': header })}>{children}</div>
);

SpotlightBanner.defaultProps = {
  header: false
};

export { SpotlightBanner };
