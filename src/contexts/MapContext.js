import { createContext, useState, useEffect } from 'react';
import { isEqual } from 'lodash';

import TargetsService from 'services/TargetsService';

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
