export interface DefaultLayoutData {
  navigation: Navigation;
  footer: Footer;
}

export interface Navigation {
  primary: NavigationItem[];
  secondary: NavigationItem[];
}

interface NavigationItem {
  title: string;
  full_url: string;
  active: boolean;
  relative_url: string;
}

export interface Footer {
  newsletters: Newsletter[];
  footer_text: string | null;
  footer_text_major: string | null;
  sections: FooterSection[];
}

interface Newsletter {
  caption: string;
  link_label: string;
  link_url: string;
}

interface FooterSection {
  title: string;
  show_navigation_links: boolean;
  section_links: SectionLink[];
  social_links: SocialLink[];
}

interface SectionLink {
  label: string;
  link_url: string;
  page_url: string;
}

interface SocialLink {
  social_platform: 'facebook' | 'twitter' | 'linkedin' | 'youtube' | 'flicker';
  link_url: string;
  image_url: string;
}
