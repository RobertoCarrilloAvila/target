import { useState, useEffect, useContext } from 'react';
import { isEqual } from 'lodash';

import { MapContext } from 'contexts/MapContext';
import TopicsService from 'services/TopicsService';
import TargetsService from 'services/TargetsService';

import FormInput from 'components/FormInput/FormInput';
import FormSelect from 'components/FormSelect/FormSelect';
import Components from 'components/Constants/Components';
import target from 'assets/icons/target.svg';
import 'components/CreateTarget/CreateTarget.scss';

const CreateTarget = ({ onContinue }) => {
  const {
    mapProperties,
    mapProperties: { selectedRadius, selectedLocation, selectedTargetId },
    setMapProperties,
    targets,
    setTargets,
  } = useContext(MapContext);

  const [topicsList, setTopicsList] = useState([]);
  const [title, setTitle] = useState('');
  const [topicId, setTopicId] = useState(null);

  useEffect(() => {
    const loadSelectedTarget = () => {
      if (!selectedTargetId) return;

      const { target } = targets.find(
        ({ target }) => target.id == selectedTargetId
      );
      if (target.title !== title) {
        console.log('title');
        setTitle(target.title);
      }
      if (topicId !== target.topic.id) {
        console.log('topic');
        setTopicId(target.topic.id);
      }

      const newMapProperties = {
        ...mapProperties,
        selectedRadius: target.radius,
        selectedLocation: {
          lat: target.latitude,
          lng: target.longitude,
        },
      };

      if (!isEqual(newMapProperties, mapProperties)) {
        console.log('map');
        setMapProperties(newMapProperties);
      }
    };

    loadSelectedTarget();
  }, [
    selectedTargetId,
    mapProperties,
    setMapProperties,
    targets,
    title,
    topicId,
  ]);

  useEffect(() => {
    const fetchTopics = async () => {
      const receivedTopics = await TopicsService.getTopics();
      const formattedTopics = receivedTopics.map(({ topic }) => ({
        key: topic.id,
        value: topic.id,
        label: topic.label,
      }));

      if (!isEqual(formattedTopics, topicsList)) {
        console.log(
          'topics',
          formattedTopics,
          topicsList,
          isEqual(formattedTopics, topicsList)
        );
        setTopicsList(formattedTopics);
      }
    };

    fetchTopics();
  }, [topicsList]);

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
      onContinue(Components.CHAT);
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
      onContinue(Components.CHAT);
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
              className="create-target__delete btn"
              onClick={deleteTarget}
            >
              delete
            </button>
          ) : (
            <button
              type="submit"
              className="create-target__submit btn"
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
