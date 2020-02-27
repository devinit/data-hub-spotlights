/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightBanner } from '../SpotlightBanner';
import { SpotlightBannerAside } from '../SpotlightBannerAside';
import { SpotlightBannerMain } from '../SpotlightBannerMain';

describe('SpotlightBanner', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightBanner />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightBanner>
        <SpotlightBannerAside />
        <SpotlightBannerMain />
        <div>My Other Child</div>
      </SpotlightBanner>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders the class spotlight-banner--header when configured as a header', () => {
    const renderer = TestRenderer.create(<SpotlightBanner header />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
