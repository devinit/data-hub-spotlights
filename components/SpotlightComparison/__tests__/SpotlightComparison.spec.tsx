/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightComparison } from '../SpotlightComparison';

describe('SpotlightComparison', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightComparison />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders the legend with the configured class', () => {
    const renderer = TestRenderer.create(
      <SpotlightComparison legendClassName="spotlight__comparison-legend--alt" />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
