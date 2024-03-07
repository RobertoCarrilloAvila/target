import sessionInterceptor from 'api/interceptors/sessionInterceptor';
import client from 'api/httpClient';
import HttpStatuses from 'api/HttpResponses';

sessionInterceptor();

const ENDPOINTS = {
  SIGN_UP: '/users',
  LOGIN: '/users/sign_in',
  PROFILE: '/users/',
  LOGOUT: '/users/sign_out',
};

const setAuthTokens = (response) => {
  const accessToken = response.headers['access-token'] || '';
  const client = response.headers['client'] || '';
  const uid = response.headers['uid'] || '';
  const userData = response.data.user || {};

  sessionStorage.setItem('api-key-access-token', accessToken);
  sessionStorage.setItem('api-key-client', client);
  sessionStorage.setItem('api-key-uid', uid);
  sessionStorage.setItem('api-user', JSON.stringify(userData));
};

const validToken = () => {
  return !!sessionStorage.getItem('api-key-access-token');
};

const UserService = {
  login: async (email, password) => {
    try {
      const response = await client.post(ENDPOINTS.LOGIN, {
        user: {
          email: email,
          password: password,
        },
      });

      if (response.status === HttpStatuses.SUCCESS) {
        setAuthTokens(response);
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  },
  signUp: async (request) => {
    const { data } = await client.post(ENDPOINTS.SIGN_UP, request);
    return data;
  },
  logOut: async () => {
    try {
      const response = await client.delete(ENDPOINTS.LOGOUT);

      if (response.status === HttpStatuses.SUCCESS) {
        sessionStorage.clear();
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  },
  profile: async () => {
    try {
      const response = await client.get(
        ENDPOINTS.PROFILE + UserService.userData().id,
      );

      if (response.status === HttpStatuses.SUCCESS) {
        return response.data;
      }

      return false;
    } catch (error) {
      return false;
    }
  },
  updateProfile: async (request) => {
    await client.put(
      `${ENDPOINTS.PROFILE}${UserService.userData().id}`,
      request,
    );
  },
  isLoggedIn: () => {
    return validToken();
  },
  userData: () => {
    return JSON.parse(sessionStorage.getItem('api-user'));
  },
};

export default UserService;
