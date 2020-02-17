/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import * as TestRenderer from 'react-test-renderer';
import { Legend } from '../Legend';
import { LegendItem } from '../LegendItem';

describe('Legend', () => {
  test('renders with the class spotlight-legend', () => {
    const { container } = render(<Legend />);

    expect(container.firstChild).toHaveClass('spotlight-legend');
  });

  test('renders only LegendItem children', () => {
    const renderer = TestRenderer.create(
      <Legend>
        <LegendItem />
        Non Legend Item
        <LegendItem />
        <span>Testing</span>
      </Legend>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
