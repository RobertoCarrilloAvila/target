import useContentView from "hooks/useContentView";
import Modal from "components/Modal/Modal";
import COMPONENT_NAMES from "components/Constants/Components";

import "components/MatchTarget/MatchTarget.scss";

const MatchTarget = ({ toggleModal, matchId, avatar,  name }) => {
  const { goTo, setDisplayedComponentData, setNavbarLeftButton } = useContentView();

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
        <h1 className="match-target__title">Yey!</h1>
        <h2 className="match-target__subtitle">You have a match!</h2>

        <div className="match-target__profile">
          <img
            className="match-target__profile-avatar"
            src={avatar || "https://picsum.photos/50/50"}
            alt="profile"
          />
          <h3 className="match-target__profile-name">{name}</h3>
        </div>

        <button onClick={openConversation} className="match-target__start-button btn">Cool! Start chatting</button>
        <button onClick={skipMatch} className="match-target__skip-button btn">Skip</button>
      </div>
    </Modal>
  );
};

export default MatchTarget;
