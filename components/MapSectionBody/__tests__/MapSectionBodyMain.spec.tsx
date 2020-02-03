/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { MapSectionBodyMain } from '../MapSectionBodyMain';

describe('MapSectionBodyMain', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<MapSectionBodyMain/>).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
