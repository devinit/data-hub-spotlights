/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import Header from '../Header';

describe('Header', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(
      <Header/>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
