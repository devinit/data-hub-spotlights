import React, { FunctionComponent } from 'react';

interface HeroProps {
  title: string;
  excerpt?: string;
}

const Hero: FunctionComponent<HeroProps> = ({ excerpt, title }) => {
  return (
    <section className="hero hero--minor">
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
      </div>
    </section>
  );
};

export { Hero };
