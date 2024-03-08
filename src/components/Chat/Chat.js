import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useConversations from 'hooks/useConversations';
import useContentView from 'hooks/useContentView';
import Profile from 'components/Profile/Profile';
import COMPONENT_NAMES from 'constants/Components';

import './Chat.scss';

const Chat = () => {
  const { t } = useTranslation();
  const { messages } = useConversations();
  const {
    goTo,
    setNavbarColor,
    setNavbarLeftButton,
    setDisplayedComponentData,
  } = useContentView();

  useEffect(() => {
    setNavbarColor('white');
    setNavbarLeftButton('');
  }, [setNavbarColor, setNavbarLeftButton]);

  const openConversation = (matchId, userName) => {
    setDisplayedComponentData({ conversationId: matchId, userName });
    goTo(COMPONENT_NAMES.CONVERSATION);
    setNavbarLeftButton('back');
  };

  return (
    <div className="chat">
      <div className="chat__container">
        <Profile />

        <h1 className="chat__title">{t('chat.title')}</h1>
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
                <button onClick={() => openConversation(match_id, full_name)}>
                  <img
                    src={small_thumb_url || 'https://picsum.photos/50/50'}
                    alt="avatar"
                    className="chat__avatar"
                  />
                  <div className="chat__message-preview">
                    <span className="chat__message-author">{full_name}</span>
                    <span className="chat__message-text">
                      {last_message || t('chat.startMatching')}
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
                </button>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
