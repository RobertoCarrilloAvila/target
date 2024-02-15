import { createContext, useState } from 'react';

const MapContext = createContext();

const MapContextProvider = ({ children }) => {
  const [mapProperties, setMapProperties] = useState({});
  const [targets, setTargets] = useState([]);

  return (
    <MapContext.Provider
      value={{ mapProperties, setMapProperties, targets, setTargets }}
    >
      {children}
    </MapContext.Provider>
  );
};

export { MapContext, MapContextProvider };
