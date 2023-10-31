import { Loader } from "@googlemaps/js-api-loader";

const VERSION = "weekly";

const loadMapApi = async () => {
  const loader = new Loader({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    version: VERSION,
  });

  await loader.load();
  return google.maps;
};

const createMap = async (elementId) => {
  const googleMaps = await loadMapApi();
  const Map = googleMaps.Map;

  return new Map(document.getElementById(elementId), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
  });
};

const setCurrentLocationAsCenter = (map) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      map.setCenter(userLocation);
    }, () => {
      console.error("Error: The Geolocation service failed.");
    });
  } else {
    console.error("Error: Your browser does not support geolocation.");
  }
};

export { createMap, setCurrentLocationAsCenter };
