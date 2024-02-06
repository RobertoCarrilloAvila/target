import { Marker, Circle } from '@react-google-maps/api';

import MapConfig from 'components/Constants/MapConfig';

const Target = ({ id, latitude, longitude, radius, icon }) => {
  return (
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
  );
};

export default Target;
