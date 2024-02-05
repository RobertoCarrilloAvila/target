import { useEffect, useContext } from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Circle,
} from '@react-google-maps/api';

import TargetsService from 'services/TargetsService';
import MapConfig from 'components/Constants/MapConfig';
import MapContext from 'contexts/MapContext';

import 'components/Map/Map.scss';
import pin from 'assets/map/pin.png';

const Map = ({ onSelectLocation }) => {
  const { mapProperties, setMapProperties, targets, setTargets } =
    useContext(MapContext);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    fetchCurrentLocation();
    fetchTargets();
  }, []);

  const fetchCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
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
    setTargets(response);
  };

  const handleMapClick = (e) => {
    setMapProperties({
      ...mapProperties,
      selectedLocation: { lat: e.latLng.lat(), lng: e.latLng.lng() },
    });
    onSelectLocation('CreateTarget');
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
        center={mapProperties.location}
        zoom={MapConfig.defaultZoom}
        streetViewControl={false}
        options={MapConfig.options}
        clickableIcons={false}
        onClick={(e) => handleMapClick(e)}
      >
        {mapProperties.selectedLocation != null && (
          <>
            <Marker
              position={mapProperties.selectedLocation}
              icon={{ url: pin }}
            />
            <Circle
              center={mapProperties.selectedLocation}
              radius={mapProperties.selectedRadius}
              options={MapConfig.selectedLocationOptions}
            />
          </>
        )}

        {targets.map(
          ({
            target: {
              id,
              latitude,
              longitude,
              radius,
              topic: { icon },
            },
          }) => (
            <>
              <Marker
                key={`marker-${id}`}
                position={{ lat: latitude, lng: longitude }}
                icon={{
                  url: icon,
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />

              <Circle
                key={`circle-${id}`}
                center={{ lat: latitude, lng: longitude }}
                radius={radius}
                options={MapConfig.targetsOptions}
              />
            </>
          )
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
