import { useContext } from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Circle,
} from '@react-google-maps/api';

import Target from 'components/Target/Target';
import MapConfig from 'components/Constants/MapConfig';
import { MapContext } from 'contexts/MapContext';

import 'components/Map/Map.scss';
import pin from 'assets/map/pin.png';

const Map = ({ onSelectLocation }) => {
  const { mapProperties, setMapProperties, targets } = useContext(MapContext);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

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
        center={mapProperties.location || MapConfig.defaultLocation}
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
          ({target, target: { topic: { icon }}}) => (
            <Target
              key={target.id}
              {...target}
              icon={icon}
            />
          )
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
