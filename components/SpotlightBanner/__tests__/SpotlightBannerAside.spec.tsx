/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightBannerAside } from '../SpotlightBannerAside';

describe('SpotlightBannerAside', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightBannerAside />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with children correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightBannerAside>
        <div>My Child</div>
      </SpotlightBannerAside>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
