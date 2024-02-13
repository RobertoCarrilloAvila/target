import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from 'components/Navbar/Navbar';

jest.mock('hooks/useContentView');

test('has color', () => {
  render(<Navbar color="blue" />, { wrapper: MemoryRouter });
  const navbar = screen.getByRole('navigation');
  expect(navbar).toHaveClass('navbar--blue');
});

test('has 2 images for mobile', () => {
  render(<Navbar color="blue" />, { wrapper: MemoryRouter });
  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(2);
});

test('has collapsible menu', () => {
  render(<Navbar color="blue" />, { wrapper: MemoryRouter });
  const menu = screen.getByRole('button', { name: 'hamburger menu' });
  expect(menu).toBeInTheDocument();
});
