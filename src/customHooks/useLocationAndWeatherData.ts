import { useMemo } from "react";
import useSWR from "swr";

import type { LocationData, WeatherData } from "../types/types";
import { fetcher, getLocationURL, getWeatherURL } from "../lib/fetcher";
import { returnUpdatedForecastData } from "../helpers/returnUpdatedForecastData/returnUpdatedForecastData";
import { returnUpdatedCurrentWeatherData } from "../helpers/returnUpdatedCurrentWeatherData/returnUpdatedCurrentWeatherData";

export const useLocationAndWeatherData = (locationCoords: { latitude: number, longitude: number } | null) => {
  const { data: locationData, error: locationError } = useSWR<LocationData>(getLocationURL(locationCoords), fetcher);

  const { data: weatherData, error: weatherError, isLoading: isLoadingWeather } = useSWR<WeatherData>(getWeatherURL(locationCoords), fetcher);
  const modifiedWeatherData = useMemo(() => {
    if (!weatherData) return null;
    if (!locationCoords) return null;
    return {
      currentWeather: returnUpdatedCurrentWeatherData(locationCoords?.latitude, locationCoords?.longitude, weatherData),
      forecast: returnUpdatedForecastData(weatherData)
    };
  }, [weatherData, locationCoords]);

  return {
    locationData,
    locationError,
    weatherError,
    isLoadingWeather: (!weatherData && !weatherError) || isLoadingWeather,
    modifiedWeatherData
  }
}