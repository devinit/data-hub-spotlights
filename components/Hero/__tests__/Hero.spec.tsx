/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { Hero } from '../Hero';

describe('Hero', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<Hero title="Spotlight" excerpt="My Spotlight" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders without an excerpt when one is not provided', () => {
    const renderer = TestRenderer.create(<Hero title="Spotlight" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
