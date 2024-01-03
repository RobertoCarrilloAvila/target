import { useState, useEffect } from "react";
import { createMap, setCurrentLocationAsCenter } from "services/MapService";
import "components/Map/Map.scss";

const MAP_ID = "map";

const Map = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = async () => {
      setMap(await createMap("map"));
      setCurrentLocationAsCenter(map);
    };

    initializeMap();
  }, []);

  return (
    <div id={ MAP_ID }></div>
  );
}

export default Map;
