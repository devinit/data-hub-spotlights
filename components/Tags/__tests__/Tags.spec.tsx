/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { Tags } from '../Tags';
import { LocationTagType } from '../../LocationComparisonSection';

const locations: LocationTagType = [
  { label: 'Masaka' },
  { label: 'Gulu' },
  { label: 'Arua' },
  { label: 'Koboko' },
  { label: 'Palisa' }
];
const onCloseTag = jest.fn();

describe('Tags', () => {
  test('It renders correctly', () => {
    const renderer = TestRenderer.create(<Tags onCloseTag={onCloseTag} updatedTags={locations} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
