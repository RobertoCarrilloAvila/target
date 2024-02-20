import { useState, useEffect, useCallback } from 'react';
import { isEqual } from 'lodash';

import ConversationsService from 'services/ConversationsService';

const useConversations = () => {
  const [messages, setMessages] = useState([]);

  const fetchMatches = useCallback(async () => {
    const matches = await ConversationsService.matches();
    const messagesIds = messages.map(({ id }) => id).sort();
    const matchesIds = matches.map(({ id }) => id).sort();

    if (isEqual(messagesIds, matchesIds)) return;
    setMessages(matches);
  }, [messages, setMessages]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return { messages };
};

export default useConversations;
