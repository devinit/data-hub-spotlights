/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { FormFieldRadioGroup } from '../FormFieldRadioGroup';

describe('FormFieldRadioGroup', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<FormFieldRadioGroup label="this" name="that" value="this-that" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
