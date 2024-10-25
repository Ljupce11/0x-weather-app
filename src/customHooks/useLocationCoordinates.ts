import { useEffect, useState } from "react";
import type { LocationCoordinates } from "../types/types";
import { handleLocationError } from "../helpers/handleLocationError/handleLocationError";
import { getBackgroundColor } from "../helpers/getCurrentRangeAndColor/getCurrentRangeAndColor";

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

export const useLocationCoordinates = () => {
  const [locationCoords, setLocationCoords] = useState<LocationCoordinates>(null);

  useEffect(() => {
    // Get the user's location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocationCoords({ latitude, longitude });
    }, (error) => handleLocationError(error, setLocationCoords), GEOLOCATION_OPTIONS);
    // Set the background color 
    const color = getBackgroundColor();
    if (color) {
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.style.background = color;
      };
    }
  }, []);

  return locationCoords;
}