import httpClient from '../httpClient';
import HttpStatuses from 'api/HttpResponses';

const ACCESS_TOKEN = 'access-token';
const UID = 'uid';
const CLIENT = 'client';

const headers = () => {
  return {
    [ACCESS_TOKEN]: sessionStorage.getItem('api-key-access-token'),
    [UID]: sessionStorage.getItem('api-key-uid'),
    [CLIENT]: sessionStorage.getItem('api-key-client'),
  };
};

const setAccessToken = (response) => {
  const responseAccessToken = response.headers['access-token'];
  const sessionAccessToken = sessionStorage.getItem('api-key-access-token');

  if (responseAccessToken && responseAccessToken !== sessionAccessToken) {
    sessionStorage.setItem('api-key-access-token', responseAccessToken);
  }
};

export default () => {
  httpClient.interceptors.request.use((request) => {
    request.headers = {
      ...request.headers,
      ...headers(),
    };

    return request;
  });

  httpClient.interceptors.response.use(
    (response) => {
      setAccessToken(response);
      return response;
    },
    (error) => {
      if (error.response.status === HttpStatuses.UNAUTHORIZED) {
        sessionStorage.clear();
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );
};
