import { useState, useEffect, useContext } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

import MapConfig from 'components/Constants/MapConfig';
import MapContext from 'contexts/MapContext';

import 'components/Map/Map.scss';
import pin from 'assets/map/pin.png';

const Map = () => {
  const {selectedLocation, setSelectedLocation} = useContext(MapContext);
  const [currentLocation, setCurrentLocation] = useState(
    MapConfig.defaultLocation
  );

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const handleMapClick = (e) => {
    setSelectedLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  if (loadError) {
    return <div className="map__error">Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className="map__loading">Loading maps</div>;
  }

  return (
    <div className="map">
      <GoogleMap
        mapContainerClassName="map__container"
        center={currentLocation}
        zoom={MapConfig.defaultZoom}
        streetViewControl={false}
        options={MapConfig.options}
        clickableIcons={false}
        onClick={ (e) => handleMapClick(e) }
      >

        { 
          selectedLocation && (
            <Marker
              position={selectedLocation}
              icon={{ url: pin, ...MapConfig.markerIcon }}
            />
          )
        }
      </GoogleMap>
    </div>
  );
};

export default Map;
