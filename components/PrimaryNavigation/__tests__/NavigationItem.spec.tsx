/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { NavigationItem, NavigationItemProps } from '../NavigationItem';

const item: NavigationItemProps = {
  title: 'Home',
  url: '/dashboard',
  active: false
};

describe('NavigationItem', () => {
  test('renders the NavigationItem correctly', () => {
    const renderer = TestRenderer.create(<NavigationItem {...item} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with the class navigation-primary__item--active when active', () => {
    item.active = true;
    const { container } = render(<NavigationItem {...item} />);

    expect(container.firstChild).toHaveClass('navigation-primary__item--active');
  });
});
