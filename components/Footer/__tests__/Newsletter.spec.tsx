/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { Newsletter } from '../Newsletter';

describe('Newsletter', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(
      <Newsletter
        caption="Sign up to our newsletter"
        link_label="Sign Up"
        link_url="https://localhost:3000/newsletter"
      />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
