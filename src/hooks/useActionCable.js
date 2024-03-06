import { useCallback, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

import { ActionCableContext } from 'contexts/ActionCableContext';
import useConversations from 'hooks/useConversations';

const CHANNEL = 'ChatChannel';
const ACTION_NAME = 'send_message';

const useActionCable = () => {
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
        {
          received: receivedHandler,
          send_message(content) {
            return this.perform(ACTION_NAME, { content: content, match_conversation_id: 14 });
          }
        }
      );
    });
  }, [cable, messages]);

  useEffect(() => {
    if (!cable) return;

    const subscriptions = createSubscriptions();

    return () => {
      subscriptions.map((subscription) => subscription.unsubscribe());
    };
  }, [cable, createSubscriptions]);

  return { cable };
};

export default useActionCable;
