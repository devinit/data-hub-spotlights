/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { FormField } from '../FormField';

describe('FormField', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<FormField />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with children correctly', () => {
    const renderer = TestRenderer.create(
      <FormField>
        <div>My Child</div>
      </FormField>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
