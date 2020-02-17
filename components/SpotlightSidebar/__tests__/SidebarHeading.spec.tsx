/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import { SidebarHeading } from '../SidebarHeading';

describe('SidebarHeading', () => {
  test('renders correctly with a heading', () => {
    const renderer = TestRenderer.create(<SidebarHeading heading="My Heading" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('has a button that responds to click events', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<SidebarHeading onClick={onClick} />);
    const button = getByTestId('spotlight-menu-trigger');
    expect(button).toBeDefined();

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
