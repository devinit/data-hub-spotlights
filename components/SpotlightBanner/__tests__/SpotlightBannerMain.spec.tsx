/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightBannerMain } from '../SpotlightBannerMain';

describe('SpotlightBannerMain', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightBannerMain/>).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with children correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightBannerMain>
        <div>My Child</div>
      </SpotlightBannerMain>).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
