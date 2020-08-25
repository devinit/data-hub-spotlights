import { NavigationItem, SectionLink, SocialLink } from '../../DefaultLayout';
import { FooterSectionProps } from '../FooterSection';

export const sectionLinks: SectionLink[] = [
  {
    label: 'Contact us',
    link_url: 'http://localhost:3000/contact-us',
    page_url: '',
  },
];
export const socialLinks: SocialLink[] = [
  {
    image_url: 'http://localhost:3000/static/images/image.svg',
    link_url: 'http://localhost:3000/contact-us',
    social_platform: 'facebook',
  },
];
export const navigationItems: NavigationItem[] = [
  {
    title: 'Nav 1',
    full_url: 'https://localhost:3000/nav-1',
    active: false,
    relative_url: '/nav-1',
  },
  {
    title: 'Nav 2',
    full_url: 'https://localhost:3000/nav-2',
    active: true,
    relative_url: '/nav-2',
  },
];
export const section: FooterSectionProps = {
  title: 'More links',
  show_navigation_links: false,
  section_links: sectionLinks,
  social_links: socialLinks,
  primaryNavigation: navigationItems,
};
