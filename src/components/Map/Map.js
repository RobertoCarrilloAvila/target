import { useState, useEffect } from "react";
import { createMap, setCurrentLocationAsCenter } from "../../services/MapService";
import "./Map.scss";

const Map = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = async () => {
      const map = await createMap("map");
      setMap(map);
      setCurrentLocationAsCenter(map);
    };

    initializeMap();
  }, []);

  return (
    <div id="map"></div>
  );
}

export default Map;
