import { Fragment, useEffect, useState } from 'react';
import axios, { type AxiosError } from 'axios';
import './style.css';

import type { CurrentWeather, Forecast, LocationData } from './types/types';
import { handleLocationError } from './helpers/handleLocationError/handleLocationError';
import { DailyForecastSection } from './components/DailyForecastSection/DailyForecastSection';
import { getBackgroundColor } from './helpers/getCurrentRangeAndColor/getCurrentRangeAndColor';
import { HourlyForecastSection } from './components/HourlyForecastSection/HourlyForecastSection';
import { CurrentWeatherSection } from './components/CurrentWeatherSection/CurrentWeatherSection';
import { returnUpdatedForecastData } from './helpers/returnUpdatedForecastData/returnUpdatedForecastData';
import { returnUpdatedCurrentWeatherData } from './helpers/returnUpdatedCurrentWeatherData/returnUpdatedCurrentWeatherData';

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
}

export const App = () => {
  const [locationData, setLocationData] = useState<LocationData>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>(null);
  const [forecast, setForecast] = useState<Forecast>(null);
  const [isLoading, setIsLoading] = useState(true);

  // if (!forecast?.length || !daily?.length) {
  //   const forecast = localStorage.getItem('forecast');
  //   const daily = localStorage.getItem('daily');

  //   try {
  //     const forecastData = JSON.parse(forecast);
  //     if (forecastData) setForecast(forecastData);

  //     const dailyData = JSON.parse(daily);
  //     if (dailyData) setDaily(dailyData);
  //   } finally {
  //   }
  // }

  useEffect(() => {
    const color = getBackgroundColor();
    if (color) {
      const rootElement = document.getElementById('root');
      if (rootElement) {
        rootElement.style.background = color;
      };
    }
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      async function getWeather() {
        try {
          const LOCATION_API_URL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude.toString()}&lon=${longitude.toString()}`;
          const locationNameResponse = await axios.get(LOCATION_API_URL);
          if (locationNameResponse.data) {
            const locationNameData = { ...locationNameResponse.data };
            setLocationData(locationNameData);
          }
        } catch (err) {
          const error = err as AxiosError;
          console.log(error);
        }

        try {
          const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude.toString()}&longitude=${longitude.toString()}&current=temperature_2m,weathercode&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Stockholm`;
          const weatherResponse = await axios.get(WEATHER_API_URL);
          setIsLoading(false);
          if (weatherResponse.data) {
            const weatherData = { ...weatherResponse.data };
            const updatedCurrentWeather = returnUpdatedCurrentWeatherData(latitude, longitude, weatherData);
            const updatedForecastData = returnUpdatedForecastData(weatherData);
            setCurrentWeather(updatedCurrentWeather);
            setForecast(updatedForecastData);
          }
        } catch (err) {
          setIsLoading(false);
          const error = err as AxiosError;
          console.log(error);
        }
      }

      getWeather();
    }, (error) => handleLocationError(error), GEOLOCATION_OPTIONS);
  }, []);

  return (
    <div>
      {
        isLoading ?
          <div className="spinner-wrapper">
            <div className='spinner' />
          </div>
          :
          <Fragment>
            <CurrentWeatherSection currentWeather={currentWeather} locationData={locationData} />
            <HourlyForecastSection forecast={forecast} />
            <DailyForecastSection forecast={forecast} />
          </Fragment>
      }
    </div>
  );
};