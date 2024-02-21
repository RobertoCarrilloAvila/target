import React, { useEffect, useRef } from 'react';

import Components from 'components/Constants/Components';
import useContentView from 'hooks/useContentView';

import 'components/MapSearchBox/MapSearchBox.scss';

const MapSearchBox = ({ onPlaceSelected }) => {
  const { goTo } = useContentView();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;
    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current
    );
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (onPlaceSelected) {
        onPlaceSelected(place);
        goTo(Components.CREATE_TARGET);
      }
    });
  }, [onPlaceSelected, goTo]);

  return (
    <input
      className="map-search-box"
      ref={inputRef}
      type="text"
      placeholder="Search a location to add a target..."
    />
  );
};

export default MapSearchBox;
