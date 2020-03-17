/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { Tags } from '../Tags';
import { LocationTagType } from '../../LocationComparisonSection';

const locations: LocationTagType = [
  { name: 'Masaka', geocode: 'd123' },
  { name: 'Gulu', geocode: 'd123' },
  { name: 'Arua', geocode: 'd123' },
  { name: 'Koboko', geocode: 'd123' },
  { name: 'Palisa', geocode: 'd123' }
];
const onCloseTag = jest.fn();

describe('Tags', () => {
  test('It renders correctly', () => {
    const renderer = TestRenderer.create(<Tags onCloseTag={onCloseTag} updatedTags={locations} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
