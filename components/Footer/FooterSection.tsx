import React, { FunctionComponent } from 'react';
import { FooterSection as FooterSectionType, NavigationItem, SocialLink } from '../DefaultLayout';

export type FooterSectionProps = FooterSectionType & { primaryNavigation: NavigationItem[] };
interface SectionLinkProps {
  url: string;
  label?: string;
}

export const FooterSectionLink: FunctionComponent<SectionLinkProps> = ({ children, url, label }) => (
  <li>
    <a href={url}>{label || children}</a>
  </li>
);

export const FooterSocialLink: FunctionComponent<SocialLink> = ({ social_platform, link_url, image_url }) => (
  <FooterSectionLink url={link_url}>
    <img src={image_url} alt={social_platform} />
  </FooterSectionLink>
);

const FooterSection: FunctionComponent<FooterSectionProps> = (props) => {
  return (
    <div className="l-footer__col">
      <h4 className="footer__title">{props.title}</h4>
      <ul className="footer__list">
        {props.primaryNavigation.map(({ full_url, title }, index) => (
          <FooterSectionLink key={`${title} ${index}`} url={full_url} label={title} />
        ))}
        {props.section_links.map(({ link_url, page_url, label }, index) => (
          <FooterSectionLink key={`${label} ${index}`} url={link_url || page_url} label={label} />
        ))}
      </ul>
      <ul className="footer__social">
        {props.social_links.map(({ link_url, social_platform, image_url }, index) => (
          <FooterSocialLink
            key={`${social_platform} ${index}`}
            link_url={link_url}
            image_url={image_url.replace('svg/', '/static/svg/')}
            social_platform={social_platform}
          />
        ))}
      </ul>
    </div>
  );
};

export { FooterSection };
