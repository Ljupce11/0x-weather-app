import { Fragment, useEffect, useState } from 'react';
import './style.css';

import type { CurrentWeather, Forecast } from './types/types';
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
        const locationNameUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude.toString()}&lon=${longitude.toString()}`;
        const locationNameResponse = await fetch(locationNameUrl);
        const locationNameData = await locationNameResponse.json();

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude.toString()}&longitude=${longitude.toString()}&current=temperature_2m,weathercode&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Stockholm`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        setIsLoading(false);

        const updatedCurrentWeather = returnUpdatedCurrentWeatherData(latitude, longitude, locationNameData, weatherData);
        const updatedForecastData = returnUpdatedForecastData(weatherData);

        setCurrentWeather(updatedCurrentWeather);
        setForecast(updatedForecastData);
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
            <CurrentWeatherSection currentWeather={currentWeather} />
            <HourlyForecastSection forecast={forecast} />
            <DailyForecastSection forecast={forecast} />
          </Fragment>
      }
    </div>
  );
};