import { useEffect, useContext } from 'react';
import ContentViewContext from 'contexts/ContentViewContext';
import Profile from 'components/Profile/Profile';

import 'components/Chat/Chat.scss';
import world from 'assets/icons/world.svg';

const Chat = () => {
  // TODO: load messages from API
  const { setNavbarColor, setNavbarLeftButton } = useContext(ContentViewContext);

  useEffect(() => {
    setNavbarColor('white');
    setNavbarLeftButton('');
  }, [setNavbarColor]);

  return (
    <div className="chat">
      <div className="chat__container">
        <Profile />

        <h1 className="chat__title">Chat</h1>
        <ul className="chat__list">
          <li className="chat__message">
            <img
              src="https://picsum.photos/50/50"
              alt="avatar"
              className="chat__avatar"
            />
            <div className="chat__message-preview">
              <span className="chat__message-author">José Gazzano</span>
              <span className="chat__message-text">
                ¡Hola! A dónde querés viajar?
              </span>
            </div>
            <div className="chat__message-icon">
              <img src={world} alt="world" />
              <span className="chat__message-counter">1</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Chat;
