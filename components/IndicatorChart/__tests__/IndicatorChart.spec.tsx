/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { IndicatorChart } from '../IndicatorChart';

describe('IndicatorChart', () => {
  test('renders default state correctly', () => {
    const renderer = TestRenderer.create(<IndicatorChart />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
