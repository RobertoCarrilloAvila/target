import { useCallback, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

import { ActionCableContext } from 'contexts/ActionCableContext';
import useConversations from 'hooks/useConversations';

const CHANNEL = 'ChatChannel';

const useNotifications = () => {
  const { cable } = useContext(ActionCableContext);
  const { messages } = useConversations();

  const receivedHandler = (data) => {
    toast.success(data.content);
  };

  const createSubscriptions = useCallback(() => {
    return messages.map(({ match_id }) => {
      return cable.subscriptions.create(
        {
          channel: CHANNEL,
          match_conversation_id: match_id,
        },
        { received: receivedHandler },
      );
    });
  }, [cable, messages]);

  useEffect(() => {
    if (!cable) return;

    const subscriptions = createSubscriptions();

    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, [cable, createSubscriptions]);

  return { cable };
};

export default useNotifications;
