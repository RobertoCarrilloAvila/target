import { useState, useEffect } from "react";
import { createMap, setCurrentLocationAsCenter } from "../../services/MapService";
import "./Map.scss";

const Map = () => {
  const MAP_ID = "map";
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
