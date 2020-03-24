/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { AnchorButton } from '../AnchorButton';

describe('AnchorButton', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<AnchorButton>Caption</AnchorButton>).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
