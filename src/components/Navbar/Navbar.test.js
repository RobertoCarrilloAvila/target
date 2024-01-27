import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

test('has className', () => {
  render(<Navbar className="blue" />, { wrapper: MemoryRouter });
  const navbar = screen.getByRole('navigation');
  expect(navbar).toHaveClass('navbar--blue');
});

test('has 2 images for mobile', () => {
  render(<Navbar className="blue" />, { wrapper: MemoryRouter });
  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(2);
});

test('has collapsible menu', () => {
  render(<Navbar className="blue" />, { wrapper: MemoryRouter });
  const menu = screen.getByRole('button', { name: 'hamburger menu' });
  expect(menu).toBeInTheDocument();
});
