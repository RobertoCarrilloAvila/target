import client from 'api/httpClient';

const TargetsService = {
  getTargets: async () => {
    try {
      const response = await client.get('/targets');
      return response.data.targets;
    } catch (error) {
      return [];
    }
  }
};

export default TargetsService;
