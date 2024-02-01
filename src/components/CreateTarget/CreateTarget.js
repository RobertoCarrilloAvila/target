import { useState, useEffect, useContext } from 'react';

import TopicsService from 'services/TopicsService';
import MapContext from 'contexts/MapContext';
import FormInput from 'components/FormInput/FormInput';
import FormSelect from 'components/FormSelect/FormSelect';
import target from 'assets/icons/target.svg';
import 'components/CreateTarget/CreateTarget.scss';

const CreateTarget = () => {
  const {selectedLocation} = useContext(MapContext);

  const [topicsList, setTopicsList] = useState([]);
  const [radius, setRadius] = useState(null);
  const [title, setTitle] = useState(null);
  const [topic, setTopic] = useState(null);

  useEffect(() => {
    fetchTopics();
  }, [])

  const fetchTopics = async () => {
    const receiveTopics = await TopicsService.getTopics();
    const formattedTopics = receiveTopics.map((elem) => {
      return {
        key: elem.topic.id,
        value: elem.topic.id,
        label: elem.topic.label
      }
    });
    setTopicsList(formattedTopics);
  }

  const createTarget = async (event) => {
    event.preventDefault();
    const target = {
      title,
      radius,
      topic_id: topic,
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    }
    console.log(target);
  }

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
            required={true}
            onChange={setRadius}
          />

          <FormInput
            type="text"
            name="title"
            className="create-target__input"
            label="target title"
            required={true}
            onChange={setTitle}
          />

          <FormSelect
            options={topicsList}
            name="topic"
            className="create-target__input"
            label="select a topic"
            required={true}
            placeholder=""
            onChange={setTopic}
          />

          <button
            type="submit"
            className="create-target__submit btn"
            disabled={!radius || !title || !topic}
          >
            save target
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateTarget;
