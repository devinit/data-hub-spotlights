/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { TabContainer } from '../TabContainer';

describe('TabContainer', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<TabContainer id="container" label="My Label" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
