/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { PageSectionHeading } from '../PageSectionHeading';

describe('PageSectionHeading', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<PageSectionHeading />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
