import { render, screen } from '@testing-library/react';
import LandingVideo from './LandingVideo';

test('has iphone preview image', () => {
  render(<LandingVideo />);
  const image = screen.getByRole('img', { name: 'iPhone6' });
  expect(image).toBeInTheDocument();
});

test('has app store image', () => {
  render(<LandingVideo />);
  const image = screen.getByRole('img', { name: 'App Store' });
  expect(image).toBeInTheDocument();
});

test('has facebook icon', () => {
  render(<LandingVideo />);
  const image = screen.getByRole('img', { name: 'Facebook' });
  expect(image).toBeInTheDocument();
});

test('has twitter icon', () => {
  render(<LandingVideo />);
  const image = screen.getByRole('img', { name: 'Twitter' });
  expect(image).toBeInTheDocument();
});
