import { render, screen } from '@testing-library/react';
import { default as userEvent } from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Login from './Login';

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

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

jest.mock('services/userService', () => ({
  login: jest.fn(),
  isLoggedIn: () => true,
}));

test('has navbar', () => {
  render(<Login />, { wrapper: MemoryRouter });
  const navbar = screen.getByRole('navigation');
  expect(navbar).toBeInTheDocument();
});

test('renders email input', () => {
  render(<Login />, { wrapper: MemoryRouter });
  const emailInput = screen.getByLabelText('email');
  expect(emailInput).toBeInTheDocument();
});

test('renders password input', () => {
  render(<Login />, { wrapper: MemoryRouter });
  const passwordInput = screen.getByLabelText('password');
  expect(passwordInput).toBeInTheDocument();
});

test('submit form', async () => {
  render(<Login />, { wrapper: BrowserRouter });
  const user = userEvent.setup();
  const emailInput = screen.getByLabelText('email');
  const passwordInput = screen.getByLabelText('password');
  const submitButton = screen.getByRole('button', { name: /sign in/i });

  await user.type(emailInput, 'test@test.com');
  await user.type(passwordInput, 'password1234');
  await user.click(submitButton);

  expect(mockedNavigate).toHaveBeenCalledWith('/home');
});
