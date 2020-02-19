import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface PageSectionProps {
  narrow?: boolean;
  wide?: boolean;
  className?: string;
  dark?: boolean;
}

const PageSection: FunctionComponent<PageSectionProps> = ({ className, children, dark, narrow, wide }) => {
  return (
    <section className={classNames('section', className, { 'section--alt-dark': dark })}>
      <div className={classNames('row', { 'row--narrow': narrow, 'row--wide': wide })}>{children}</div>
    </section>
  );
};

export { PageSection };
