import client from 'api/httpClient';

const questionsService = {
  send_question: async (request) => {
    const { data } = await client.post('/questions', request);
    return data;
  },
};

export default questionsService;
