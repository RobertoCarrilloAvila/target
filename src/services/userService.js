import client from "../api/httpClient";

const UserService = {
  login: async (request) => {
    const { data } = await client.post("/users/sign_in", request);
    return data;
  },
  signUp: async (request) => {
    const { data } = await client.post("/users", request);
    return data;
  }
};

export default UserService;
