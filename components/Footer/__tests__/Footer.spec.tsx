/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { Footer } from '../Footer';
import { Footer as FooterType } from '../../DefaultLayout';
import { navigationItems, section } from './mockData';

const footer: FooterType = {
  footer_text: 'Text Minor',
  footer_text_major: 'Text Major',
  newsletters: [
    {
      caption: 'Sign up for our newsletters',
      link_label: 'Sign up',
      link_url: 'http://localhost:3000/newsletter'
    }
  ],
  sections: [section]
};

describe('Footer', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<Footer primaryNavigation={navigationItems} {...footer} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
