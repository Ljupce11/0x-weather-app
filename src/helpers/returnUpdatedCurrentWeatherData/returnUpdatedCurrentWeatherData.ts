import type { WeatherData } from "../../types/types";

type LocationNameData = {
  address: {
    city?: string;
  }
}

export const returnUpdatedCurrentWeatherData = (latitude: number, longitude: number, locationNameData: LocationNameData, weatherData: WeatherData) => {
  return {
    location: {
      latitude,
      longitude,
      name: locationNameData.address.city || "Current location"
    },
    temp: `${Math.round(weatherData.current.temperature_2m).toString()}°`,
    cond: weatherData.current.weathercode,
    range: {
      min: `${Math.round(weatherData.daily.temperature_2m_min[0]).toString()}°`,
      max: `${Math.round(weatherData.daily.temperature_2m_max[0]).toString()}°`,
    }
  }
}