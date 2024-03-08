import client from 'api/httpClient';

const topicsService = {
  getTopics: async () => {
    try {
      const response = await client.get('/topics');
      if (response.status !== 200) {
        return [];
      }

      return response.data.topics;
    } catch (error) {
      return [];
    }
  },
};

export default topicsService;
