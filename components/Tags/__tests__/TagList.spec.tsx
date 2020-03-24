/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { TagList } from '../TagList';
import { TagListItem } from '../TagListItem';

describe('TagList', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<TagList />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders TagListItems', () => {
    const renderer = TestRenderer.create(
      <TagList>
        <TagListItem label="Tag 1" />
        <div>Not TagListItem</div>
        <TagListItem label="Tag 2" />
      </TagList>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
