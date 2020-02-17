/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { FooterSection, FooterSectionLink, FooterSocialLink } from '../FooterSection';
import { section, sectionLinks, socialLinks } from './mockData';

describe('FooterSection', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<FooterSection {...section} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders either a page_url or a link_url', () => {
    sectionLinks[0].page_url = 'http://localhost:3000/my-page';
    sectionLinks[0].link_url = '';
    const renderer = TestRenderer.create(<FooterSection {...section} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});

describe('FooterSectionLink', () => {
  test('renders correctly', () => {
    const sectionLink = sectionLinks[0];
    const renderer = TestRenderer.create(
      <FooterSectionLink url={sectionLink.link_url} label={sectionLink.label} />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});

describe('FooterSocialLink', () => {
  test('renders correctly', () => {
    const socialLink = socialLinks[0];
    const renderer = TestRenderer.create(<FooterSocialLink {...socialLink} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
