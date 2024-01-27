import client from '../api/httpClient';

const QuestionsService = {
  send_question: async (request) => {
    const { data } = await client.post('/questions', request);
    return data;
  },
};

export default QuestionsService;
