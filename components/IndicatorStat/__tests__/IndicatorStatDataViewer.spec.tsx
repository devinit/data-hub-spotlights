/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { IndicatorStatDataViewer } from '../IndicatorStatDataViewer';

describe('IndicatorStatDataViewer', () => {
  test('renders default state correctly', () => {
    const renderer = TestRenderer.create(<IndicatorStatDataViewer />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders a value correctly', () => {
    const renderer = TestRenderer.create(<IndicatorStatDataViewer value="My Value" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders a note correctly', () => {
    const renderer = TestRenderer.create(<IndicatorStatDataViewer value="My Note" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders a value and a note correctly', () => {
    const renderer = TestRenderer.create(
      <IndicatorStatDataViewer value="My Value" note={{ content: 'My Note' }} />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
