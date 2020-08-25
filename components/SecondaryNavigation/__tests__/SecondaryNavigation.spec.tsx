/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { SecondaryNavigation } from '../SecondaryNavigation';
import { NavigationItemProps, NavigationItem } from '../NavigationItem';

const items: NavigationItemProps[] = [
  {
    title: 'Nav 1',
    url: 'https://localhost:3000/nav-1',
    active: false,
  },
  {
    title: 'Nav 2',
    url: 'https://localhost:3000/nav-2',
    active: true,
  },
];

describe('SecondaryNavigation', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SecondaryNavigation />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with specified className', () => {
    const { container } = render(<SecondaryNavigation className="spotlight-secondary-nav" />);

    expect(container.firstChild).toHaveClass('spotlight-secondary-nav');
  });

  test('renders with specified navigation items', () => {
    const renderer = TestRenderer.create(<SecondaryNavigation items={items} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with specified children (preferably NavigationItem)', () => {
    const renderer = TestRenderer.create(
      <SecondaryNavigation>
        <NavigationItem title="My Nav" url="/my-nav" active />
      </SecondaryNavigation>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
