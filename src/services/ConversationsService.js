import client from 'api/httpClient';

const ConversationsService = {
  matches: async () => {
    try {
      const response = await client.get('/match_conversations');
      return response.data.matches;
    } catch (error) {
      return [];
    }
  },
};

export default ConversationsService;
