import client from "../api/httpClient";
import HttpStatuses from "api/HttpResponses";

const ENDPOINTS = {
  SIGN_UP: "/users",
  LOGIN: "/users/sign_in",
};

const setAuthTokens = (response) => {
  const accessToken = response.headers['access-token'] || '';
  const client = response.headers['client'] || '';
  const uid = response.headers['uid'] || '';

  sessionStorage.setItem('api-key-access-token', accessToken);
  sessionStorage.setItem('api-key-client', client);
  sessionStorage.setItem('api-key-uid', uid);
}

const UserService = {
  login: async (email, password) => {
    try {
      const response = await client.post(ENDPOINTS.LOGIN, {
        user: {
          email: email,
          password: password
        }
      });
  
      if (response.status === HttpStatuses.SUCCESS) {
        setAuthTokens(response);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
    
  },
  signUp: async (request) => {
    const { data } = await client.post(ENDPOINTS.SIGN_UP, request);
    return data;
  }
};

export default UserService;
