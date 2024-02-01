import client from 'api/httpClient';
import HttpStatuses from 'api/HttpResponses';

const TargetsService = {
  create: async (request) => {
    try {
      const response = await client.post('/targets', request);
      if (response.status === HttpStatuses.SUCCESS) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  },
};

export default TargetsService;
