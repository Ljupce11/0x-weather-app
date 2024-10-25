import { useMemo } from "react";
import useSWR from "swr";

import type { LocationData, WeatherData } from "../types/types";
import { fetcher, getLocationURL, getWeatherURL } from "../lib/fetcher";
import { returnUpdatedForecastData } from "../helpers/returnUpdatedForecastData/returnUpdatedForecastData";
import { returnUpdatedCurrentWeatherData } from "../helpers/returnUpdatedCurrentWeatherData/returnUpdatedCurrentWeatherData";

export const useLocationAndWeatherData = (locationCoords: { latitude: number, longitude: number } | null, isOffline: boolean) => {
  const { data: locationData } = useSWR<LocationData>(getLocationURL(locationCoords, isOffline), fetcher);
  const { data: weatherData, error: weatherError, isLoading } = useSWR<WeatherData>(getWeatherURL(locationCoords, isOffline), fetcher);

  const isLoadingWeather = isOffline ? false : isLoading;

  const modifiedWeatherData = useMemo(() => {
    if (isOffline) {
      const cachedData = JSON.parse(localStorage.getItem('data') || '{}');
      if (cachedData) {
        return {
          currentWeather: returnUpdatedCurrentWeatherData(cachedData?.latitude, cachedData?.longitude, cachedData),
          forecast: returnUpdatedForecastData(cachedData)
        };
      }
      return null;
    }
    if (weatherData && locationCoords) {
      return {
        currentWeather: returnUpdatedCurrentWeatherData(locationCoords?.latitude, locationCoords?.longitude, weatherData),
        forecast: returnUpdatedForecastData(weatherData)
      };
    }
    return null;
  }, [weatherData, locationCoords, isOffline]);

  return {
    locationData,
    weatherData: modifiedWeatherData,
    isLoadingWeather: (!modifiedWeatherData && !weatherError) || isLoadingWeather,
    weatherError: weatherError
  }
}