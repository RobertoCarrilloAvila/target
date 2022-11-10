import client from "../api/httpClient";

const UserService = {
  login: async (request) => {
    const { data } = await client.post("/api/v1/users/sign_in", request);
    return data;
  },
};

export default UserService;
