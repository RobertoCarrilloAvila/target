import { useCallback, useState, useEffect } from 'react';
import { isEqual } from 'lodash';

import useContentView from 'hooks/useContentView';
import ConversationsService from 'services/ConversationsService';
import Message from 'components/Message/Message';

import './Conversation.scss';
import world from 'assets/icons/world.svg';

const Conversation = () => {
  const [messages, setMessages] = useState([]);
  const { displayedComponentData } = useContentView();
  const { conversationId, userName } = displayedComponentData;

  const fetchMessages = useCallback(async () => {
    const fetchedMessages = await ConversationsService.messages(conversationId);
    if (!isEqual(messages, fetchedMessages)) setMessages(fetchedMessages);
  }, [conversationId, messages]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className="conversation">
      <div className="conversation__container">
        <div className="conversation__header">
          <img src={world} alt="world" />

          <div className="conversation__partner-info">
            <h2>{userName}</h2>
          </div>
        </div>

        <section className="conversation__messages">
          {messages.map(({ id, content, deliveryStatus, time }) => (
            <Message
              key={id}
              deliveryStatus={deliveryStatus}
              text={content}
              time={time}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Conversation;
