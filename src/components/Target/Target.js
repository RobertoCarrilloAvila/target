import { Marker, Circle } from '@react-google-maps/api';

import MapConfig from 'components/Constants/MapConfig';

const Target = ({ id, latitude: lat, longitude: lng, radius, icon }) => (
  <>
    <Marker
      key={`marker-${id}`}
      position={{ lat: lat, lng: lng }}
      icon={{
        url: icon,
        scaledSize: new window.google.maps.Size(40, 40),
      }}
    />
    <Circle
      key={`circle-${id}`}
      center={{ lat: lat, lng: lng }}
      radius={radius}
      options={MapConfig.targetsOptions}
    />
  </>
);

export default Target;
