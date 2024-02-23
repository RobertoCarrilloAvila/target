import {
  GoogleMap,
  Marker,
  useLoadScript,
  Circle,
} from '@react-google-maps/api';

import MapSearchBox from 'components/MapSearchBox/MapSearchBox';
import useMap from 'hooks/useMap';
import useContentView from 'hooks/useContentView';
import Target from 'components/Target/Target';
import MapConfig from 'components/Constants/MapConfig';
import Components from 'components/Constants/Components';

import 'components/Map/Map.scss';
import pin from 'assets/map/pin.png';

const Map = () => {
  const {
    selectedLocation,
    selectedRadius,
    targets,
    handleMapClick,
    handleTargetClick,
    handleSearchBoxPlaceSelected,
    selectedTargetId,
    isSelectedTargetStored,
    location,
  } = useMap();
  const { goTo, setNavbarLeftButton } = useContentView();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  if (loadError) {
    return <div className="map__error">Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div className="map__loading">Loading maps</div>;
  }

  return (
    <div className="map">
      <MapSearchBox
        onPlaceSelected={handleSearchBoxPlaceSelected}
        goTo={goTo}
      />
      <GoogleMap
        mapContainerClassName="map__container"
        center={location || MapConfig.defaultLocation}
        zoom={MapConfig.defaultZoom}
        streetViewControl={false}
        options={MapConfig.options}
        clickableIcons={false}
        onClick={(e) => {
          handleMapClick(e);
          goTo(Components.CREATE_TARGET);
          setNavbarLeftButton('back');
        }}
      >
        {!isSelectedTargetStored && (
          <>
            <Marker position={selectedLocation} icon={{ url: pin }} />
            <Circle
              center={selectedLocation}
              radius={selectedRadius}
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
              selected={selectedTargetId === id}
              onClick={() => {
                handleTargetClick(id);
                goTo(Components.CREATE_TARGET);
                setNavbarLeftButton('back');
              }}
            />
          )
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
