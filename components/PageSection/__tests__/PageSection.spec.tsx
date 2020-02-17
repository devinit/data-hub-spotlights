/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { PageSection } from '../PageSection';

describe('PageSection', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<PageSection />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders the appropriate class when narrow', () => {
    const renderer = TestRenderer.create(<PageSection narrow />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders the appropriate class when wide', () => {
    const renderer = TestRenderer.create(<PageSection wide />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
