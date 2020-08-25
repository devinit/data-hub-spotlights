import React, { FunctionComponent, Children, isValidElement } from 'react';
import { HeroAside } from './HeroAside';

interface HeroProps {
  title: string;
  excerpt?: string;
}

const Hero: FunctionComponent<HeroProps> = ({ children, excerpt, title }) => {
  return (
    <section className="hero hero--spotlight hero--minor">
      <span className="hero__flourish" />
      <span className="hero__flourish" />
      <span className="hero__flourish" />
      <span className="hero__flourish" />
      <span className="hero__flourish" />
      <span className="hero__flourish" />
      <span className="hero__flourish" />
      <span className="hero__flourish" />
      <div className="row row--narrow">
        <div className="hero__content">
          <h1 className="hero__title">
            <span>{title}</span>
          </h1>
          {excerpt ? (
            <p className="hero__excerpt">
              <span>{excerpt}</span>
            </p>
          ) : null}
        </div>
        {Children.map(children, (child) => (isValidElement(child) && child.type === HeroAside ? child : null))}
      </div>
    </section>
  );
};

export { Hero };
