import { Marker, Circle } from '@react-google-maps/api';

import mapConfig from 'constants/mapConfig';

const Target = ({
  id,
  latitude: lat,
  longitude: lng,
  radius,
  icon,
  selected,
  onClick,
}) => (
  <>
    <Marker
      key={`marker-${id}`}
      position={{ lat: lat, lng: lng }}
      icon={{
        url: icon,
        scaledSize: new window.google.maps.Size(40, 40),
      }}
      onClick={onClick}
    />
    <Circle
      key={`circle-${id}`}
      center={{ lat: lat, lng: lng }}
      radius={radius}
      options={
        selected ? mapConfig.selectedTargetsOptions : mapConfig.targetsOptions
      }
    />
  </>
);

export default Target;
