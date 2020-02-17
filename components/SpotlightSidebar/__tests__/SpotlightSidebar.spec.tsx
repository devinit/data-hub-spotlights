/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
// import { render } from '@testing-library/react';
import { SpotlightSidebar } from '../SpotlightSidebar';

describe('SpotlightSidebar', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightSidebar />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
