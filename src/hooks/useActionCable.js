import { useCallback, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

import { ActionCableContext } from 'contexts/ActionCableContext';
import useConversations from 'hooks/useConversations';

const CHANNEL = 'ChatChannel';
const ACTION_NAME = 'send_message';

const useActionCable = () => {
  const { cable } = useContext(ActionCableContext);
  const { messages } = useConversations();

  const findConversation = (id) => messages.find(({ match_id }) => match_id === id);

  const receivedHandler = (data) => {
    const { content } = data;
    const { content: messageContent, match_conversation_id: matchConversationId } = JSON.parse(content.replace(/=>/g, ':'));
    console.log('selected conversation', findConversation(matchConversationId));
    toast.success(data.content, {});
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
