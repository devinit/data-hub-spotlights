/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { IndicatorStat } from '../IndicatorStat';

describe('IndicatorStat', () => {
  test('renders default state correctly', () => {
    const renderer = TestRenderer.create(<IndicatorStat />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
