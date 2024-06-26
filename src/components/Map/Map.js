import {
  GoogleMap,
  Marker,
  useLoadScript,
  Circle,
} from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';

import MapSearchBox from 'components/MapSearchBox/MapSearchBox';
import useMap from 'hooks/useMap';
import useContentView from 'hooks/useContentView';
import Target from 'components/Target/Target';
import mapConfig from 'constants/mapConfig';
import COMPONENT_NAMES from 'constants/components';

import './Map.scss';
import pin from 'assets/map/pin.png';

const Map = () => {
  const { t } = useTranslation();
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
    return <div className="map__error">{t('map.error')}</div>;
  }

  if (!isLoaded) {
    return <div className="map__loading">{t('map.loading')}</div>;
  }

  return (
    <div className="map">
      <MapSearchBox
        onPlaceSelected={handleSearchBoxPlaceSelected}
        goTo={goTo}
      />
      <GoogleMap
        mapContainerClassName="map__container"
        center={location || mapConfig.defaultLocation}
        zoom={mapConfig.defaultZoom}
        streetViewControl={false}
        options={mapConfig.options}
        clickableIcons={false}
        onClick={(e) => {
          handleMapClick(e);
          goTo(COMPONENT_NAMES.CREATE_TARGET);
          setNavbarLeftButton('back');
        }}
      >
        {!isSelectedTargetStored && (
          <>
            <Marker position={selectedLocation} icon={{ url: pin }} />
            <Circle
              center={selectedLocation}
              radius={selectedRadius}
              options={mapConfig.selectedLocationOptions}
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
                goTo(COMPONENT_NAMES.CREATE_TARGET);
                setNavbarLeftButton('back');
              }}
            />
          ),
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
