import axios from "axios";

const APPLICATION_JSON = "application/json";
export const MULTIPART_FORM_DATA = "multipart/form-data";
export const CONTENT_TYPE = "Content-Type";

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  headers: {
    Accept: APPLICATION_JSON,
    CONTENT_TYPE: APPLICATION_JSON,
  },
});

export default httpClient;
