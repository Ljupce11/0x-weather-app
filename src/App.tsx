import { Fragment } from 'react';
import { Toaster } from 'react-hot-toast';
import './style.css';

import { useOnlineStatus } from './customHooks/useOnlineStatus';
import { useLocationCoordinates } from './customHooks/useLocationCoordinates';
import { useLocationAndWeatherData } from './customHooks/useLocationAndWeatherData';
import { DailyForecastSection } from './components/DailyForecastSection/DailyForecastSection';
import { HourlyForecastSection } from './components/HourlyForecastSection/HourlyForecastSection';
import { CurrentWeatherSection } from './components/CurrentWeatherSection/CurrentWeatherSection';

export const App = () => {
  const isOffline = useOnlineStatus();
  const locationCoords = useLocationCoordinates();
  const { locationData, weatherData, isLoadingWeather } = useLocationAndWeatherData(locationCoords, isOffline);

  return (
    <div>
      {
        isLoadingWeather ?
          <div className="spinner-wrapper">
            <div className='spinner' />
          </div>
          :
          <Fragment>
            <CurrentWeatherSection currentWeather={weatherData?.currentWeather} locationData={locationData} />
            <HourlyForecastSection forecast={weatherData?.forecast} />
            <DailyForecastSection forecast={weatherData?.forecast} />
          </Fragment>
      }
      <Toaster
        position="bottom-center"
      />
    </div>
  );
};