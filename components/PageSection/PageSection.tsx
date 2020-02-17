import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface PageSectionProps {
  narrow?: boolean;
  wide?: boolean;
}

const PageSection: FunctionComponent<PageSectionProps> = ({ children, narrow, wide }) => {
  return (
    <section className="section">
      <div className={classNames('row', { 'row--narrow': narrow, 'row--wide': wide })}>{children}</div>
    </section>
  );
};

export { PageSection };
