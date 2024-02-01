import client from 'api/httpClient';

const TargetsService = {
  create: async (request) => {
    try {
      await client.post('/targets', request);
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default TargetsService;
