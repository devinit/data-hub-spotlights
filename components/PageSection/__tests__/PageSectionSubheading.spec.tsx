/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { PageSectionSubheading } from '../PageSectionSubheading';

describe('PageSectionSubheading', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<PageSectionSubheading />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('It renders children correctly', () => {
    const renderer = TestRenderer.create(<PageSectionSubheading>{'My Child'}</PageSectionSubheading>);

    expect(renderer).toMatchSnapshot();
  });
});
