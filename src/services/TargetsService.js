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
  getTargets: async () => {
    try {
      const response = await client.get('/targets');
      return response.data.targets;
    } catch (error) {
      return [];
    }
  },
  delete: async (targetId) => {
    try {
      await client.delete(`/targets/${targetId}`);
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default TargetsService;
