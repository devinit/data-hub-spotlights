/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { ButtonBanner } from '../ButtonBanner';

describe('ButtonBanner', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<ButtonBanner />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders the provided className', () => {
    const renderer = TestRenderer.create(<ButtonBanner className="button-banner" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with children', () => {
    const renderer = TestRenderer.create(
      <ButtonBanner>
        <span>Caption</span>
      </ButtonBanner>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
