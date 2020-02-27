/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import { SpotlightInteractive } from '../SpotlightInteractive';

describe('SpotlightInteractive', () => {
  test('renders correctly', () => {
    const renderer = TestRenderer.create(<SpotlightInteractive />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders the configured class name', () => {
    const renderer = TestRenderer.create(
      <SpotlightInteractive className="spotlight__interactive--max-height" />
    ).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders the configured height', () => {
    const renderer = TestRenderer.create(<SpotlightInteractive height="300px" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders the configured minHeight', () => {
    const renderer = TestRenderer.create(<SpotlightInteractive minHeight="300px" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });

  test('renders the configured maxHeight', () => {
    const renderer = TestRenderer.create(<SpotlightInteractive maxHeight="400px" />).toJSON();

    expect(renderer).toMatchSnapshot();
  });
});
