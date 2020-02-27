/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightSidebar } from '../../SpotlightSidebar';
import { VisualisationSection } from '../VisualisationSection';
import { VisualisationSectionMain } from '../VisualisationSectionMain';

describe('VisualisationSection', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<VisualisationSection />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders only SpotlightSidebar & VisualisationSectionMain', () => {
    const renderer = TestRenderer.create(
      <VisualisationSection>
        <SpotlightSidebar />
        <VisualisationSectionMain />
        <div>This will not Show</div>
      </VisualisationSection>
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders with the specified class name', () => {
    const renderer = TestRenderer.create(<VisualisationSection className="spotlight--leader" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
