/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightHeading } from '../SpotlightHeading';

describe('SpotlightHeading', () => {
  test('renders correctly with a heading', () => {
    const renderer = TestRenderer.create(<SpotlightHeading>My Heading</SpotlightHeading>).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with the specificed class name', () => {
    const renderer = TestRenderer.create(<SpotlightHeading className="my-class" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
