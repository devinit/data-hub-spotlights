/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { MapSectionBody } from '../MapSectionBody';
import { SpotlightSidebar } from '../../SpotlightSidebar';
import { MapSectionBodyMain } from '../MapSectionBodyMain';

describe('MapSectionBody', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<MapSectionBody/>).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders only SpotlightSidebar & MapSectionBodyMain', () => {
    const renderer = TestRenderer.create(
      <MapSectionBody>
        <SpotlightSidebar/>
        <MapSectionBodyMain/>
        <div>This Won't Show</div>
      </MapSectionBody>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
