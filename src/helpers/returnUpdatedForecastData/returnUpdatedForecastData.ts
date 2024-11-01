import type { WeatherData } from "../../types/types";

export const returnUpdatedForecastData = (weatherData: WeatherData) => {
  // LOGIC FOR HOURLY FORECAST
  const hours: string[] = weatherData.hourly.time;
  const temperatures: number[] = weatherData.hourly.temperature_2m;
  const conditions: number[] = weatherData.hourly.weathercode;
  const hourlyForecast = hours.map((time, index) => ({
    datetime: time,
    temperature: `${Math.round(temperatures[index])}°`,
    conditions: conditions[index],
  }));

  const now = new Date();
  const nowISO = `${now.toISOString().slice(0, 13)}:00`;
  const currentIndex = hours.findIndex(hour => hour === nowISO);
  // Extract the next 24 elements after the current index
  const next24Forecast = currentIndex !== -1
    ? hourlyForecast.slice(currentIndex + 2, currentIndex + 25)
    : [];

  // LOGIC FOR DAILY FORECAST
  const dates: string[] = weatherData.daily.time;
  const maxTemps: number[] = weatherData.daily.temperature_2m_max;
  const minTemps: number[] = weatherData.daily.temperature_2m_min;
  const highestMaxTemp = Math.max(...maxTemps.map(Math.round));
  const lowestMinTemp = Math.min(...minTemps.map(Math.round));
  const difference = highestMaxTemp - lowestMinTemp;
  const unit = 100 / difference;

  const dailyForecast = dates.map((date, index) => ({
    datetime: date,
    range: {
      min: Math.round(minTemps[index]).toString(),
      max: Math.round(maxTemps[index]).toString(),
    },
    newRange: {
      min: Math.round((Math.round(minTemps[index]) - lowestMinTemp) * unit),
      max: Math.round((highestMaxTemp - Math.round(maxTemps[index])) * unit),
    }
  }));

  return {
    hourly: next24Forecast,
    daily: dailyForecast,
  }
}