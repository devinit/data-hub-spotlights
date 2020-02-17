/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { TabContent } from '../TabContent';

describe('TabContent', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<TabContent />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with children', () => {
    const renderer = TestRenderer.create(
      <TabContent>
        <div>My Child</div>
      </TabContent>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
