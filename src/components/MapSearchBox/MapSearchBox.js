import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import COMPONENT_NAMES from 'constants/Components';
import useContentView from 'hooks/useContentView';

import 'components/MapSearchBox/MapSearchBox.scss';

const MapSearchBox = ({ onPlaceSelected }) => {
  const { t } = useTranslation();
  const { goTo } = useContentView();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
    );
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (onPlaceSelected) {
        onPlaceSelected(place);
        goTo(COMPONENT_NAMES.CREATE_TARGET);
      }
    });
  }, [onPlaceSelected, goTo]);

  return (
    <input
      className="map-search-box"
      ref={inputRef}
      type="text"
      placeholder={t('mapSearchBox.placeholder')}
    />
  );
};

export default MapSearchBox;
