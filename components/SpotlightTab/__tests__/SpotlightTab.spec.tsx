/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightTab } from '../SpotlightTab';

describe('SpotlightTab', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightTab />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
