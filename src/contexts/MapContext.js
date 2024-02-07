import { createContext, useState, useEffect } from 'react';
import TargetsService from 'services/TargetsService';

const MapContext = createContext();

const MapContextProvider = ({ children }) => {
  const [mapProperties, setMapProperties] = useState({});
  const [targets, setTargets] = useState([]);

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
      if (targets !== response) setTargets(response);
    };

    fetchCurrentLocation();
    fetchTargets();
  }, [mapProperties]);

  return (
    <MapContext.Provider
      value={{ mapProperties, setMapProperties, targets, setTargets }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapContext, MapContextProvider };
