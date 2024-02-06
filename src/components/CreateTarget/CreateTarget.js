import { useState, useEffect, useContext } from 'react';

import MapContext from 'contexts/MapContext';
import TopicsService from 'services/TopicsService';
import TargetsService from 'services/TargetsService';

import FormInput from 'components/FormInput/FormInput';
import FormSelect from 'components/FormSelect/FormSelect';
import target from 'assets/icons/target.svg';
import 'components/CreateTarget/CreateTarget.scss';

const CreateTarget = ({ onContinue }) => {
  const { mapProperties: { selectedRadius, selectedLocation }, setMapProperties } = useContext(MapContext);

  const [topicsList, setTopicsList] = useState([]);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    fetchTopics();
  }, []);

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
    radius: selectedRadius,
    topic_id: topic,
    latitude: selectedLocation.lat,
    longitude: selectedLocation.lng,
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
          />

          <FormInput
            type="text"
            name="title"
            className="create-target__input"
            label="target title"
            required
            onChange={setTitle}
          />

          <FormSelect
            options={topicsList}
            name="topic"
            className="create-target__input"
            label="select a topic"
            required
            placeholder=""
            onChange={setTopic}
          />

          <button
            type="submit"
            className="create-target__submit btn"
            disabled={!selectedRadius || !title || !topic}
          >
            save target
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTarget;
