import React, { FunctionComponent } from 'react';
import { Newsletter as NewsletterType } from '../DefaultLayout';

type NewsletterProps = NewsletterType;

const Newsletter: FunctionComponent<NewsletterProps> = ({ caption, link_label, link_url }) => {
  return (
    <>
      <h4 className="footer__title">{caption}</h4>
      <a href={link_url} className="button">
        {link_label}
      </a>
    </>
  );
};

export { Newsletter };
