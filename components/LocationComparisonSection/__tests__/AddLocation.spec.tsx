/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { AddLocation } from '../AddLocation';

const onWidgetClick = jest.fn();

describe('Add Location', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(
      <AddLocation active={true} label={'Add Location'} onWidgetClick={onWidgetClick} />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('It does not render when active class is false', () => {
    const renderer = TestRenderer.create(
      <AddLocation active={false} label={'Add Location'} onWidgetClick={onWidgetClick} />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
