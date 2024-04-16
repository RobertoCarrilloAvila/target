import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUpConfirm from './SignUpConfirm';

jest.mock('hooks/useContentView', () => () => ({
  displayedComponent: 'Home',
  goTo: jest.fn(),
  isMapVisible: false,
  setIsMapVisible: jest.fn(),
  navbarColor: 'blue',
  setNavbarColor: jest.fn(),
  navbarLeftButton: 'back',
  setNavbarLeftButton: jest.fn(),
}));

test('has smiles image', () => {
  render(<SignUpConfirm />, { wrapper: MemoryRouter });
  const image = screen.getByAltText('smiles');
  expect(image).toBeInTheDocument();
});
