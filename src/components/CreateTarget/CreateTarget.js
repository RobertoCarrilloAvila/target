import { useState, useEffect, useContext } from 'react';

import MapContext from 'contexts/MapContext';
import TopicsService from 'services/TopicsService';
import TargetsService from 'services/TargetsService';

import FormInput from 'components/FormInput/FormInput';
import FormSelect from 'components/FormSelect/FormSelect';
import target from 'assets/icons/target.svg';
import 'components/CreateTarget/CreateTarget.scss';

const CreateTarget = ({ onContinue }) => {
  const { mapProperties, setMapProperties, targets, setTargets } = useContext(MapContext);

  const [topicsList, setTopicsList] = useState([]);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    fetchTopics();
    loadSelectedTarget();
  }, [mapProperties.selectedTargetId]);

  const loadSelectedTarget = () => {
    const { selectedTargetId: targetId } = mapProperties;
    if (!targetId) return;

    const { target } = targets.find(({ target }) => target.id == targetId );
    setTitle(target.title);
    setTopic(target.topic.id);
    setMapProperties({
      ...mapProperties,
      selectedRadius: target.radius,
      selectedLocation: {
        lat: target.latitude,
        lng: target.longitude,
      }
    })
  };

  const fetchTopics = async () => {
    const receivedTopics = await TopicsService.getTopics();
    const formattedTopics = receivedTopics.map(({ topic }) => ({
      key: topic.id,
      value: topic.id,
      label: topic.label,
    }));
    setTopicsList(formattedTopics);
  };

  const buildTargetRequest = () => ({
    title,
    radius: mapProperties.selectedRadius,
    topic_id: topic,
    latitude: mapProperties.selectedLocation.lat,
    longitude: mapProperties.selectedLocation.lng,
  });

  const createTarget = async (event) => {
    event.preventDefault();
    const target = buildTargetRequest();

    const created = await TargetsService.create(target);
    if (created) {
      onContinue('Chat');
    } else {
      alert('Error creating target');
    }
  };

  const deleteTarget = async () => {
    const { selectedTargetId } = mapProperties;
    const deleted = await TargetsService.delete(selectedTargetId);
    if (deleted) {
      setTargets(targets.filter(({ target }) => target.id !== selectedTargetId));
      onContinue('Chat');
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
                ...mapProperties,
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
            onChange={setTopic}
            value={topic}
          />

          {mapProperties.selectedTargetId ? (
            <button
              type='button'
              className="create-target__delete btn"
              onClick={deleteTarget}
            >
              delete
            </button>
          ) : (
            <button
              type="submit"
              className="create-target__submit btn"
              disabled={!mapProperties.selectedRadius || !title || !topic}
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
