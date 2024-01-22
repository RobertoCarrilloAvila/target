import httpClient from "../httpClient";

const ACCESS_TOKEN = "access-token";
const UID = "uid";
const CLIENT = "client";

const headers = () => {
  return {
    [ACCESS_TOKEN]: sessionStorage.getItem('api-key-access-token'),
    [UID]: sessionStorage.getItem('api-key-uid'),
    [CLIENT]: sessionStorage.getItem('api-key-client'),
  }
}

export default () => {
  httpClient.interceptors.request.use((request) => {
    request.headers = {
      ...request.headers,
      ...headers(),
    };

    return request;
  });
};
