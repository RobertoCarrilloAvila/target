import humps from 'humps';

import httpClient, { CONTENT_TYPE, MULTIPART_FORM_DATA } from '../httpClient';

const ACCESS_TOKEN = 'access-token';
const UID = 'uid';
const CLIENT = 'client';

export default () => {
  httpClient.interceptors.request.use(request => {
    const session = JSON.parse(sessionStorage.getItem("currentUser"));
    const { data, headers } = request;
    if (session) {
      const { token, client, uid } = session;
      request.headers = {
        ...headers,
        [ACCESS_TOKEN]: token,
        client,
        uid,
      };
    }

    if (headers && headers[CONTENT_TYPE] !== MULTIPART_FORM_DATA) {
      request.data = humps.decamelizeKeys(data);
    }

    return request;
  });

  httpClient.interceptors.response.use(
    async response => {
      const { data, headers } = response;
      const token = headers[ACCESS_TOKEN];
      if (token) {
        const userSession = {
          token,
          uid: headers[UID],
          client: headers[CLIENT],
        };
        sessionStorage.setValue("currentUser", JSON.stringify(userSession));
      }
      response.data = humps.camelizeKeys(data);

      return response;
    },
    error => {
      if (error.response && error.response.status === 401) {
        sessionStorage.removeItem("currentUser");
      }

      return Promise.reject(error);
    },
  );
};