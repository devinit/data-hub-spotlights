/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { Icon } from '../Icon';

describe('Icon', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<Icon name="warning-warning" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
