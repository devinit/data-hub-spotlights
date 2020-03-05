/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SelectWithData } from '../SelectWithData';

const onWidgetClick = jest.fn();

describe('SelectWithData', () => {
  test('It renders correctly', () => {
    const renderer = TestRenderer.create(
      <SelectWithData show={true} countryCode={'UG'} onWidgetClick={onWidgetClick} />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('It does not render when show is false', () => {
    const renderer = TestRenderer.create(
      <SelectWithData show={false} countryCode={'UG'} onWidgetClick={onWidgetClick} />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
