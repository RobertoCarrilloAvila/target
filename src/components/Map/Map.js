import {
  GoogleMap,
  Marker,
  useLoadScript,
  Circle,
} from '@react-google-maps/api';

import useMap from 'hooks/useMap';
import Target from 'components/Target/Target';
import MapConfig from 'components/Constants/MapConfig';
import Components from 'components/Constants/Components';

import 'components/Map/Map.scss';
import pin from 'assets/map/pin.png';

const Map = ({ onSelectLocation }) => {
  const {
    mapProperties,
    targets,
    handleMapClick,
    handleTargetClick,
    isSelectedTargetStored
  } = useMap();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

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
        onClick={(e) => {
          console.log('handleMapClick');
          handleMapClick(e);
          onSelectLocation(Components.CREATE_TARGET);
        }}
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
              onClick={(event) => {
                handleTargetClick(id);
                onSelectLocation(Components.DELETE_TARGET);
              }}
            />
          )
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
