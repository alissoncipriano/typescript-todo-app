import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const hello = screen.getByText(/Hello, World/i);
  expect(hello).toBeInTheDocument();
});
