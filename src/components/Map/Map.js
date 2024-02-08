import { useContext } from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Circle,
} from '@react-google-maps/api';

import Target from 'components/Target/Target';
import { MapContext } from 'contexts/MapContext';
import MapConfig from 'components/Constants/MapConfig';
import Components from 'components/Constants/Components';

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
      selectedTargetId: null,
    });
    onSelectLocation(Components.CREATE_TARGET);
  };

  const handleTargetClick = (targetId) => {
    setMapProperties({
      ...mapProperties,
      selectedTargetId: targetId,
      selectedLocation: null,
    });
    onSelectLocation(Components.CREATE_TARGET);
  };

  const isSelectedTargetStored = () => {
    return (
      mapProperties.selectedLocation != null &&
      mapProperties.selectedTargetId != null
    );
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
        {!isSelectedTargetStored() && (
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
            <Target
              key={id}
              id={id}
              latitude={latitude}
              longitude={longitude}
              radius={radius}
              icon={icon}
              selected={mapProperties.selectedTargetId === id}
              onClick={() => handleTargetClick(id)}
            />
          )
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
