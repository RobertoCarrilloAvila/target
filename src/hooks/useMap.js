import { useState, useEffect, useContext } from 'react';
import { isEqual } from 'lodash';

import { MapContext } from 'contexts/MapContext';
import TopicsService from 'services/TopicsService';

const useMap = () => {
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

      if (target.title !== title) setTitle(target.title);
      if (topicId !== target.topic.id) setTopicId(target.topic.id);

      const newMapProperties = {
        ...mapProperties,
        selectedRadius: target.radius,
        selectedLocation: {
          lat: target.latitude,
          lng: target.longitude,
        },
      };

      if (!isEqual(newMapProperties, mapProperties))
        setMapProperties(newMapProperties);
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

      if (!isEqual(formattedTopics, topicsList)) setTopicsList(formattedTopics);
    };

    fetchTopics();
  }, [topicsList]);

  return {
    selectedRadius,
    selectedLocation,
    selectedTargetId,
    mapProperties,
    setMapProperties,
    targets,
    setTargets,
    topicsList,
    setTopicsList,
    title,
    setTitle,
    topicId,
    setTopicId,
  };
};

export default useMap;
