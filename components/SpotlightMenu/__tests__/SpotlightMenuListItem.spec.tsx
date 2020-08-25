/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { SpotlightMenuListItem } from '../SpotlightMenuListItem';

describe('SpotlightMenuListItem', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightMenuListItem item={{ label: 'Busia', value: 'busia' }} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('has the class active when active', () => {
    const { getByTestId } = render(<SpotlightMenuListItem item={{ label: 'Mukono', value: 'mukono' }} active />);

    const link = getByTestId('spotlight-menu-list-item-link');

    expect(link).toHaveClass('active');
  });

  test('renders the appropriate classes for each depth', () => {
    const item = { label: 'Mukono', value: 'mukono' };
    const { getByTestId, rerender } = render(<SpotlightMenuListItem item={item} />);

    expect(getByTestId('spotlight-menu-list-item-link')).toHaveClass('countries-menu-list__item--parent-first');

    [
      [2, 'countries-menu-list__item--parent-second'],
      [3, 'countries-menu-list__item--parent-third'],
      [4, 'countries-menu-list__item--parent-fourth'],
      [5, 'countries-menu-list__item--parent-fifth'],
      [6, 'countries-menu-list__item--parent-sixth'],
    ].forEach((depth: [number, string]) => {
      rerender(<SpotlightMenuListItem item={item} depth={depth[0]} />);

      expect(getByTestId('spotlight-menu-list-item-link')).toHaveClass(depth[1]);
    });
  });

  describe('with children', () => {
    test('renders correctly', () => {
      const renderer = TestRenderer.create(
        <SpotlightMenuListItem item={{ label: 'Palisa', value: 'palisa' }}>
          <div>Testing</div>
        </SpotlightMenuListItem>
      ).toJSON();

      expect(renderer).toMatchSnapshot();
    });

    test('calls the onView function when viewable', () => {
      const onView = jest.fn();
      const { getByTestId, rerender } = render(
        <SpotlightMenuListItem item={{ label: 'Mukono', value: 'mukono' }} viewable={false} onView={onView}>
          <div>Testing</div>
        </SpotlightMenuListItem>
      );

      const link = getByTestId('spotlight-menu-list-item-link');

      fireEvent.click(link);
      expect(onView).not.toHaveBeenCalled();

      rerender(
        <SpotlightMenuListItem item={{ label: 'Mukono', value: 'mukono' }} viewable onView={onView}>
          <div>Testing</div>
        </SpotlightMenuListItem>
      );

      fireEvent.click(link);
      expect(onView).toHaveBeenCalled();
    });

    test('toggles the appropriate class when clicked', () => {
      const { getByTestId } = render(
        <SpotlightMenuListItem item={{ label: 'Mukono', value: 'mukono' }}>
          <div>Testing</div>
        </SpotlightMenuListItem>
      );

      const link = getByTestId('spotlight-menu-list-item-link');

      fireEvent.click(link);
      expect(link).toHaveClass('countries-menu-list__item--open');

      fireEvent.click(link);
      expect(link).not.toHaveClass('countries-menu-list__item--open');
    });
  });
});
