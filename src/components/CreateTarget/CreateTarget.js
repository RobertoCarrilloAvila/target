import { useContext } from 'react';
import ContentViewContext from 'contexts/ContentViewContext';
import useMap from 'hooks/useMap';
import TargetsService from 'services/TargetsService';

import FormInput from 'components/FormInput/FormInput';
import FormSelect from 'components/FormSelect/FormSelect';
import Components from 'components/Constants/Components';
import target from 'assets/icons/target.svg';
import 'components/CreateTarget/CreateTarget.scss';

const CreateTarget = () => {
  const {
    mapProperties,
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
  const { setDisplayedComponent } = useContext(ContentViewContext);

  const buildTargetRequest = () => ({
    title,
    radius: selectedRadius,
    topic_id: topicId,
    latitude: selectedLocation.lat,
    longitude: selectedLocation.lng,
  });

  const createTarget = async (event) => {
    event.preventDefault();
    const target = buildTargetRequest();

    const created = await TargetsService.create(target);
    if (created) {
      setDisplayedComponent(Components.CHAT);
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
      setDisplayedComponent(Components.CHAT);
    } else {
      alert('Error deleting target');
    }
  };

  return (
    <div className="create-target">
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
            value={mapProperties.selectedRadius || ''}
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
