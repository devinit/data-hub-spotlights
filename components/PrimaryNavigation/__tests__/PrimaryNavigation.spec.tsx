/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/naming-convention */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { PrimaryNavigation } from '../PrimaryNavigation';
import { NavigationItem } from '../../DefaultLayout';

const items: NavigationItem[] = [
  {
    title: 'Nav 1',
    full_url: 'https://localhost:3000/nav-1',
    active: false,
    relative_url: '/nav-1',
  },
  {
    title: 'Nav 2',
    full_url: 'https://localhost:3000/nav-2',
    active: true,
    relative_url: '/nav-2',
  },
];

describe('PrimaryNavigation', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<PrimaryNavigation items={items} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('adds & removes necessary classes on button toggle', () => {
    const { getByTestId } = render(<PrimaryNavigation items={items} />);

    const button = getByTestId('navigation-primary-toggle');
    const nav = getByTestId('navigation-primary');

    expect(button).not.toHaveClass('navigation-primary-toggle--active');
    expect(nav).not.toHaveClass('navigation-primary--active');

    fireEvent.click(button);

    expect(button).toHaveClass('navigation-primary-toggle--active');
    expect(nav).toHaveClass('navigation-primary--active');

    fireEvent.click(button);

    expect(button).not.toHaveClass('navigation-primary-toggle--active');
    expect(nav).not.toHaveClass('navigation-primary--active');
  });
});
