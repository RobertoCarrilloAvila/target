import { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import MapConfig from 'components/Constants/MapConfig';

import "components/Map/Map.scss";

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(MapConfig.defaultLocation);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }, []);

  if (loadError) {
    return <div className='map__error'>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className='map__loading'>Loading maps</div>;
  }

  return (
    <div className="map">
      <GoogleMap
        mapContainerClassName="map__container"
        center={currentLocation}
        zoom={MapConfig.defaultZoom}
      >

      </GoogleMap>
    </div>
  )
}

export default Map;
