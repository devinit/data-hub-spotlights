/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { FormFieldRadio } from '../FormFieldRadio';

describe('FormFieldRadio', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<FormFieldRadio />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
