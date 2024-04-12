import httpClient from 'api/httpClient';
import MockAdapter from 'axios-mock-adapter';

import { login, signUp, logOut, isLoggedIn } from 'services/userService';

const mock = new MockAdapter(httpClient);

describe('login', () => {
  const loginRequest = {
    user: {
      email: 'roberto@test.com',
      password: 'password123',
    },
  };

  const loginResponse = {
    user: {
      id: 2,
      email: 'roberto@test.com',
      first_name: 'Roberto',
      last_name: 'Carrillo',
      name: 'Roberto Carrillo',
      username: 'RobCar',
      gender: 'male',
      avatar: {
        original_url: null,
        normal_url: null,
        small_thumb_url: null,
      },
    },
  };

  it('logs in successfully', async () => {
    mock
      .onPost(`${process.env.REACT_APP_API_HOST}/users/sign_in`, loginRequest)
      .reply(200, loginResponse);

    const result = await login('roberto@test.com', 'password123');
    expect(result).toEqual(true);
  });

  it('returns false when login fails', async () => {
    mock
      .onPost(`${process.env.REACT_APP_API_HOST}/users/sign_in`, loginRequest)
      .networkError();

    const result = await login('roberto@test.com', 'password123');
    expect(result).toEqual(false);
  });
});

describe('signUp', () => {
  const signUpRequest = {
    user: {
      first_name: 'Roberto',
      last_name: 'Carrillo',
      username: 'RobCar',
      email: 'roberto@test.com',
      gender: 'male',
      password: 'password123',
      password_confirmation: 'password123',
    },
  };

  const signUpResponse = {
    ...signUpRequest,
    id: 1,
    avatar: {
      original_url: null,
      normal_url: null,
      small_thumb_url: null,
    },
  };

  it('signs up successfully', async () => {
    mock
      .onPost(`${process.env.REACT_APP_API_HOST}/users`, signUpRequest)
      .reply(200, signUpResponse);

    const result = await signUp(signUpRequest);
    expect(result).toEqual(signUpResponse);
  });

  it('returns false when sign up fails', async () => {
    mock
      .onPost(`${process.env.REACT_APP_API_HOST}/users`, signUpRequest)
      .networkError();

    const result = await signUp(signUpRequest);
    expect(result).toEqual(false);
  });
});

describe('logOut', () => {
  const logOurResponse = {
    success: true,
  };

  it('logs out successfully', async () => {
    mock
      .onDelete(`${process.env.REACT_APP_API_HOST}/users/sign_out`)
      .reply(200, logOurResponse);

    const result = await logOut();
    expect(result).toEqual(true);
  });

  it('returns false when log out fails', async () => {
    mock
      .onDelete(`${process.env.REACT_APP_API_HOST}/users/sign_out`)
      .networkError();

    const result = await logOut();
    expect(result).toEqual(false);
  });
});

describe('isLoggedIn', () => {
  it('returns true when there is a valid token', () => {
    const mockGetItem = jest.fn().mockReturnValue('123456');
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: mockGetItem,
      },
      writable: true,
    });

    console.log(isLoggedIn());
    expect(isLoggedIn()).toEqual(true);
  });

  it('returns false when there is no valid token', () => {
    expect(isLoggedIn()).toEqual(false);
  });
});
