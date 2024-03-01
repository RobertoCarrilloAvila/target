import { useState } from 'react';
import useContentView from 'hooks/useContentView';
import useMap from 'hooks/useMap';
import { toast } from 'react-toastify';

import TargetsService from 'services/TargetsService';
import FormInput from 'components/FormInput/FormInput';
import FormSelect from 'components/FormSelect/FormSelect';
import MatchTarget from 'components/MatchTarget/MatchTarget';

import COMPONENT_NAMES from 'components/Constants/Components';
import target from 'assets/icons/target.svg';
import 'components/CreateTarget/CreateTarget.scss';

const MAX_TARGETS_AMOUNT = 10;

const CreateTarget = () => {
  const {
    setMapProperties,
    selectedLocation,
    selectedRadius,
    selectedTargetId,
    targets,
    setTargets,
    setTitle,
    topicsList,
    setTopicId,
    topicId,
    title,
  } = useMap();
  const { goTo } = useContentView();

  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState({});
  const [matchedId, setMatchedId] = useState(null);

  const buildTargetRequest = () => ({
    title,
    radius: selectedRadius,
    topic_id: topicId,
    latitude: selectedLocation.lat,
    longitude: selectedLocation.lng,
  });

  const createTarget = async (event) => {
    event.preventDefault();
    if (targets.length >= MAX_TARGETS_AMOUNT) {
      toast.error('You have reached the maximum amount of targets');
      return;
    }

    const targetData = buildTargetRequest();
    const {
      target,
      matched_user: matchedUserData,
      match_conversation,
    } = await TargetsService.create(targetData);

    if (matchedUserData) {
      setShowMatchModal(true);
      setMatchedUser(matchedUserData);
      setMatchedId(match_conversation.id);
      return;
    }

    if (target) {
      goTo(COMPONENT_NAMES.CHAT);
    } else {
      alert('Error creating target');
    }
  };

  const deleteTarget = async () => {
    const deleted = await TargetsService.delete(selectedTargetId);
    if (deleted) {
      setTargets(
        targets.filter(({ target }) => target.id !== selectedTargetId)
      );
      goTo(COMPONENT_NAMES.CHAT);
    } else {
      alert('Error deleting target');
    }
  };

  const hideModal = () => {
    setShowMatchModal(false);
  };

  return (
    <div className="create-target">
      {showMatchModal && (
        <MatchTarget
          toggleModal={hideModal}
          matchedUser={matchedUser}
          matchId={matchedId}
        />
      )}

      <div className="create-target__container">
        <img src={target} alt="target" className="create-target__icon" />
        <h1 className="create-target__title">create new target</h1>

        <form className="create-target__form" onSubmit={createTarget}>
          <FormInput
            type="number"
            name="radius"
            className="create-target__input"
            label="specify area length"
            required
            onChange={(val) => {
              setMapProperties({
                selectedLocation,
                selectedRadius: parseInt(val),
              });
            }}
            min="1"
            value={selectedRadius || ''}
          />

          <FormInput
            type="text"
            name="title"
            className="create-target__input"
            label="target title"
            required
            onChange={setTitle}
            value={title}
          />

          <FormSelect
            options={topicsList}
            name="topic"
            className="create-target__input"
            label="select a topic"
            required
            placeholder=""
            onChange={setTopicId}
            value={topicId}
          />

          {selectedTargetId ? (
            <button
              type="button"
              className="create-target__delete btn create-target__btn-primary"
              onClick={deleteTarget}
            >
              delete
            </button>
          ) : (
            <button
              type="submit"
              className="create-target__submit btn create-target__btn-primary"
              disabled={!selectedRadius || !title || !topicId}
            >
              save target
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateTarget;
