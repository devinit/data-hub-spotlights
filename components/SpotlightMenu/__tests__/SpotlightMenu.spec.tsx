/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
// import { render } from '@testing-library/react';
import { SpotlightMenu, SpotlightMenuItem } from '../SpotlightMenu';

describe('SpotlightMenu', () => {
  const sidebarItems: SpotlightMenuItem[] = [
    {
      title: 'Level 1',
      children: [
        {
          title: 'Level 1.1'
        },
        {
          title: 'Level 1.2'
        },
        {
          title: 'Level 1.3'
        }
      ]
    },
    {
      title: 'Level 2'
    },
    {
      title: 'Level 3',
      children: [
        {
          title: 'Level 3.1'
        },
        {
          title: 'Level 3.2',
          url: 'https://google.com'
        }
      ]
    }
  ];

  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightMenu items={sidebarItems} />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
