import type { WeatherData } from "../../types/types";

export const returnUpdatedCurrentWeatherData = (latitude: number, longitude: number, weatherData: WeatherData) => {
  return {
    location: {
      latitude,
      longitude
    },
    temp: `${Math.round(weatherData.current.temperature_2m).toString()}°`,
    cond: weatherData.current.weathercode,
    range: {
      min: `${Math.round(weatherData.daily.temperature_2m_min[0]).toString()}°`,
      max: `${Math.round(weatherData.daily.temperature_2m_max[0]).toString()}°`,
    }
  }
}