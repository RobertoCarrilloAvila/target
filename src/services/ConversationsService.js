import { format, parseISO } from 'date-fns';

import UserService from 'services/UserService';
import client from 'api/httpClient';

const deliveryStatuses = {
  SENT: 'sent',
  RECEIVED: 'received',
};

const ConversationsService = {
  matches: async () => {
    try {
      const response = await client.get('/match_conversations');
      return response.data.matches;
    } catch (error) {
      return [];
    }
  },
  messages: async (id) => {
    try {
      const response = await client.get(`/match_conversations/${id}/messages`);
      const messages = response.data.messages.map((message) => {
        const { content, date, user } = message;
        const time = format(parseISO(date), 'HH:mm a');
        const { id: currentUserId } = UserService.userData();
        const deliveryStatus =
          user.id === currentUserId
            ? deliveryStatuses.SENT
            : deliveryStatuses.RECEIVED;

        return { id, content, time, deliveryStatus, user };
      });

      return messages;
    } catch (error) {
      return [];
    }
  },
};

export default ConversationsService;
