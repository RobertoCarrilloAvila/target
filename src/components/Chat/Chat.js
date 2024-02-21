import useConversations from 'hooks/useConversations';
import { useEffect } from 'react';
import useContentView from 'hooks/useContentView';
import Profile from 'components/Profile/Profile';

import 'components/Chat/Chat.scss';

const Chat = () => {
  const { messages } = useConversations();
  const { setNavbarColor, setNavbarLeftButton } = useContentView();

  useEffect(() => {
    setNavbarColor('white');
    setNavbarLeftButton('');
  }, [setNavbarColor, setNavbarLeftButton]);

  return (
    <div className="chat">
      <div className="chat__container">
        <Profile />

        <h1 className="chat__title">Chat</h1>
        <ul className="chat__list">
          {messages.map(
            ({
              match_id,
              last_message,
              topic_icon,
              unread_messages,
              user: { small_thumb_url, full_name },
            }) => (
              <li className="chat__message" key={match_id}>
                <img
                  src={small_thumb_url || 'https://picsum.photos/50/50'}
                  alt="avatar"
                  className="chat__avatar"
                />
                <div className="chat__message-preview">
                  <span className="chat__message-author">{full_name}</span>
                  <span className="chat__message-text">
                    {last_message || 'Start matching to see your conversations here'}
                  </span>
                </div>
                <div className="chat__message-icon">
                  <img src={topic_icon} alt="world" />
                  {unread_messages > 0 && (
                    <span className="chat__message-counter">
                      {unread_messages}
                    </span>
                  )}
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
