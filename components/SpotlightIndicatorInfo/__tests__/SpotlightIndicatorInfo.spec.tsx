/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightIndicatorInfo } from '../SpotlightIndicatorInfo';

describe('SpotlightIndicatorInfo', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(
      <SpotlightIndicatorInfo heading="Heading" description="Description" />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
