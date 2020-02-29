import React from 'react';
import { render } from '@testing-library/react';
import Overlay from './Overlay';

test('renders learn react link', () => {
  const { getByText } = render(<Overlay />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
