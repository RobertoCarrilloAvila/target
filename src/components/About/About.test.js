import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';

test('renders title', () => {
  render(<About />, { wrapper: MemoryRouter });
  const linkElement = screen.getByText(/What's target/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders description', () => {
  render(<About />, { wrapper: MemoryRouter });
  const linkElement = screen.getByRole('contentinfo');
  expect(linkElement).toBeInTheDocument();
});

test('renders get started button', () => {
  render(<About />, { wrapper: MemoryRouter });
  const linkElement = screen.getByText(/get started/i);
  expect(linkElement).toBeInTheDocument();
});
