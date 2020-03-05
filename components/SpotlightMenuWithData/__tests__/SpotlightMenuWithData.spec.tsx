/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightMenuWithData } from '../SpotlightMenuWithData';

const onWidgetClick = jest.fn();

describe('SpotlightMenuWithData', () => {
  test('It renders correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightMenuWithData onWidgetClick={onWidgetClick} countryName={'Uganda'} spotlightMenu={true} />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('It does not render when spotlightMenu is false', () => {
    const renderer = TestRenderer.create(
      <SpotlightMenuWithData onWidgetClick={onWidgetClick} countryName={'Uganda'} spotlightMenu={false} />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
