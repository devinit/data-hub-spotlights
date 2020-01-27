/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightBannerForm } from '../SpotlightBannerForm';

describe('SpotlightBannerForm', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightBannerForm/>).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightBannerForm>
        <div>My Child</div>
      </SpotlightBannerForm>).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
