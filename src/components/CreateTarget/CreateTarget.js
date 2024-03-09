import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import useContentView from 'hooks/useContentView';
import useMap from 'hooks/useMap';
import targetsService from 'services/targetsService';
import FormInput from 'components/FormInput/FormInput';
import FormSelect from 'components/FormSelect/FormSelect';
import MatchTarget from 'components/MatchTarget/MatchTarget';

import COMPONENT_NAMES from 'constants/components';
import target from 'assets/icons/target.svg';
import './CreateTarget.scss';

const MAX_TARGETS_AMOUNT = 10;

const CreateTarget = () => {
  const { t } = useTranslation();
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
      toast.error(t('createTarget.limitReached'));
      return;
    }

    const targetData = buildTargetRequest();
    const {
      target,
      matched_user: matchedUserData,
      match_conversation,
    } = await targetsService.create(targetData);

    if (matchedUserData) {
      setShowMatchModal(true);
      setMatchedUser(matchedUserData);
      setMatchedId(match_conversation.id);
      return;
    }

    if (target) {
      goTo(COMPONENT_NAMES.CHAT);
    } else {
      alert(t('createTarget.createError'));
    }
  };

  const deleteTarget = async () => {
    const deleted = await targetsService.delete(selectedTargetId);
    if (deleted) {
      setTargets(
        targets.filter(({ target }) => target.id !== selectedTargetId),
      );
      goTo(COMPONENT_NAMES.CHAT);
    } else {
      alert(t('createTarget.deleteError'));
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
        <h1 className="create-target__title">{t('createTarget.title')}</h1>

        <form className="create-target__form" onSubmit={createTarget}>
          <FormInput
            type="number"
            name="radius"
            className="create-target__input"
            label={t('createTarget.radiusLabel')}
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
            label={t('createTarget.titleLabel')}
            required
            onChange={setTitle}
            value={title}
          />

          <FormSelect
            options={topicsList}
            name="topic"
            className="create-target__input"
            label={t('createTarget.topicLabel')}
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
              {t('createTarget.deleteButton')}
            </button>
          ) : (
            <button
              type="submit"
              className="create-target__submit btn create-target__btn-primary"
              disabled={!selectedRadius || !title || !topicId}
            >
              {t('createTarget.saveButton')}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateTarget;
