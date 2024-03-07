import { useTranslation } from 'react-i18next';

import useContentView from 'hooks/useContentView';
import Modal from 'components/Modal/Modal';
import COMPONENT_NAMES from 'components/Constants/Components';


import 'components/MatchTarget/MatchTarget.scss';

const MatchTarget = ({ toggleModal, matchId, matchedUser }) => {
  const { t } = useTranslation();
  const { name, avatar } = matchedUser;
  const { goTo, setDisplayedComponentData, setNavbarLeftButton } =
    useContentView();

  const openConversation = () => {
    setDisplayedComponentData({ conversationId: matchId, userName: name });
    goTo(COMPONENT_NAMES.CONVERSATION);
    setNavbarLeftButton('back');
  };

  const skipMatch = () => {
    goTo(COMPONENT_NAMES.CHAT);
  };

  return (
    <Modal toggleModal={toggleModal} title="Match Target">
      <div className="match-target">
        <h1 className="match-target__title">{t('matchTarget.title')}</h1>
        <h2 className="match-target__subtitle">{t('matchTarget.subtitle')}</h2>

        <div className="match-target__profile">
          <img
            className="match-target__profile-avatar"
            src={avatar.normal_url || 'https://picsum.photos/50/50'}
            alt="profile"
          />
          <h3 className="match-target__profile-name">{name}</h3>
        </div>

        <button
          onClick={openConversation}
          className="match-target__start-button btn"
        >
          {t('matchTarget.startConversation')}
        </button>
        <button onClick={skipMatch} className="match-target__skip-button btn">
          {t('matchTarget.skip')}
        </button>
      </div>
    </Modal>
  );
};

export default MatchTarget;
