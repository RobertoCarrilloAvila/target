import { useState, useEffect, useContext } from 'react';
import { isEqual } from 'lodash';

import { MapContext } from 'contexts/MapContext';
import TopicsService from 'services/TopicsService';
import TargetsService from 'services/TargetsService';

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

  useEffect(() => {
    const fetchCurrentLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        if (mapProperties.location) return;

        setMapProperties({
          ...mapProperties,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
    };

    const fetchTargets = async () => {
      const response = await TargetsService.getTargets();
      const targetsIds = targets.map(({ id }) => id).sort();
      const responseIds = response.map(({ id }) => id).sort();

      if (!isEqual(targetsIds, responseIds)) setTargets(response);
    };

    fetchCurrentLocation();
    fetchTargets();
  }, [mapProperties, targets, setMapProperties, setTargets]);

  const handleMapClick = (e) => {
    setMapProperties({
      ...mapProperties,
      selectedLocation: { lat: e.latLng.lat(), lng: e.latLng.lng() },
      selectedTargetId: null,
    });
  };

  const handleTargetClick = (targetId) => {
    setMapProperties({
      ...mapProperties,
      selectedTargetId: targetId,
      selectedLocation: null,
    });
  };

  const isSelectedTargetStored = () => {
    return (
      mapProperties.selectedLocation != null &&
      mapProperties.selectedTargetId != null
    );
  };

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
    handleMapClick,
    handleTargetClick,
    isSelectedTargetStored,
  };
};

export default useMap;
