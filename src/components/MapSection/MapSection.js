import 'components/MapSection/MapSection.scss';

import Map from 'components/Map/Map';

const MapSection = ({ onSelectLocation }) => {
  return (
    <div className="map-section">
      <Map onSelectLocation={onSelectLocation} />
    </div>
  );
};

export default MapSection;
