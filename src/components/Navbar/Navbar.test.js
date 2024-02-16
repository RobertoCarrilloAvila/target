import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from 'components/Navbar/Navbar';

jest.mock('hooks/useContentView');

test('has color', () => {
  render(<Navbar color="blue" />, { wrapper: MemoryRouter });
  const navbar = screen.getByRole('navigation');
  expect(navbar).toHaveClass('navbar--blue');
});

test('has no color', () => {
  render(<Navbar />, { wrapper: MemoryRouter });
  const navbar = screen.getByRole('navigation');
  expect(navbar).toHaveClass('navbar--white');
});

test('has back button', () => {
  render(<Navbar leftButton="back" />, { wrapper: MemoryRouter });
  const back = screen.getByAltText('back arrow');
  expect(back).toBeInTheDocument();
});

test('has 2 images for mobile', () => {
  render(<Navbar color="blue" />, { wrapper: MemoryRouter });
  const images = screen.getAllByRole('img');
  const navbar = screen.getByRole('navigation');

  expect(navbar).toHaveClass('navbar--blue');
  expect(images).toHaveLength(2);
});

test('has collapsible menu', () => {
  render(<Navbar color="blue" />, { wrapper: MemoryRouter });
  const menu = screen.getByRole('button', { name: 'hamburger menu' });
  expect(menu).toBeInTheDocument();
});
