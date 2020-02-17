/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { TabContentHeader } from '../TabContentHeader';

describe('TabContentHeader', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<TabContentHeader />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with children', () => {
    const renderer = TestRenderer.create(
      <TabContentHeader>
        <div>My Child</div>
      </TabContentHeader>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
