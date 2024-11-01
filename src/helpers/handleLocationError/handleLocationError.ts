import type { LocationCoordinates } from "../../types/types";

export const handleLocationError = (error: GeolocationPositionError, setLocationCoords: (data: LocationCoordinates) => void) => {
  const cachedData = JSON.parse(localStorage.getItem('data') || '{}');
  if (cachedData.latitude && cachedData.longitude) {
    setLocationCoords({ latitude: cachedData.latitude, longitude: cachedData.longitude })
  }
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    default:
      alert("An unknown error occurred.");
  }
}