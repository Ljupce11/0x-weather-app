import { Fragment, useEffect, useState } from 'react';
import './style.css';

import type { CurrentWeather, Forecast } from './types/types';
import { DailyForecastSection } from './components/DailyForecastSection/DailyForecastSection';
import { getBackgroundColor } from './helpers/getCurrentRangeAndColor/getCurrentRangeAndColor';
import { HourlyForecastSection } from './components/HourlyForecastSection/HourlyForecastSection';
import { CurrentWeatherSection } from './components/CurrentWeatherSection/CurrentWeatherSection';

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

        // LOGIC FOR CURRENT WEATHER
        const updatedCurrentWeather = {
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
          },
        }

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
        const nowISO = `${now.toISOString().slice(0, 13)}:00`; // Format: "YYYY-MM-DDTHH:00"
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

        setCurrentWeather(updatedCurrentWeather);
        setForecast({
          hourly: next24Forecast,
          daily: dailyForecast,
        });
      }

      getWeather();
    },
      (error) => {
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
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
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