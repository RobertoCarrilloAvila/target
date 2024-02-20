import useConversations from 'hooks/useConversations';
import Profile from 'components/Profile/Profile';

import 'components/Chat/Chat.scss';

const Chat = () => {
  const { messages } = useConversations();

  return (
    <div className="chat">
      <div className="chat__container">
        <Profile />

        <h1 className="chat__title">Chat</h1>
        <ul className="chat__list">
          {messages.map((message) => (
            <li className="chat__message" key={message.match_id}>
              <img
                src={
                  message.user.small_thumb_url || 'https://picsum.photos/50/50'
                }
                alt="avatar"
                className="chat__avatar"
              />
              <div className="chat__message-preview">
                <span className="chat__message-author">
                  {message.user.full_name}
                </span>
                <span className="chat__message-text">
                  {message.last_message}
                </span>
              </div>
              <div className="chat__message-icon">
                <img src={message.topic_icon} alt="world" />
                {message.unread_messages == 0 && (
                  <span className="chat__message-counter">
                    {message.unread_messages}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
