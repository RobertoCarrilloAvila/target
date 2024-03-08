import './MapSection.scss';

import Map from 'components/Map/Map';

const MapSection = ({ className }) => {
  return (
    <div className={`map-section ${className}`}>
      <Map />
    </div>
  );
};

export default MapSection;
