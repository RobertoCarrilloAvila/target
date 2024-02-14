import { useState, useEffect, useContext } from 'react';

import { MapContext } from 'contexts/MapContext';
import TopicsService from 'services/TopicsService';

const useMap = () => {
  const {
    mapProperties: { selectedRadius, selectedLocation },
    setMapProperties,
    mapProperties,
    targets,
    setTargets,
  } = useContext(MapContext);

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

  return {
    selectedRadius,
    selectedLocation,
    mapProperties,
    setMapProperties,
    topicsList,
    setTopicsList,
    title,
    setTitle,
    topic,
    setTopic,
    targets,
    setTargets,
  };
};

export default useMap;
