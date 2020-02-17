/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SidebarContent } from '../SidebarContent';

describe('SidebarContent', () => {
  test('renders correctly with the specified height style', () => {
    const renderer = TestRenderer.create(<SidebarContent height="300px" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders children correctly', () => {
    const renderer = TestRenderer.create(
      <SidebarContent height="400px">
        <div>My Child</div>
      </SidebarContent>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
