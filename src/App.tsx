import { Fragment } from 'react';
import './style.css';

import { useLocationCoordinates } from './customHooks/useLocationCoordinates';
import { useLocationAndWeatherData } from './customHooks/useLocationAndWeatherData';
import { DailyForecastSection } from './components/DailyForecastSection/DailyForecastSection';
import { HourlyForecastSection } from './components/HourlyForecastSection/HourlyForecastSection';
import { CurrentWeatherSection } from './components/CurrentWeatherSection/CurrentWeatherSection';

export const App = () => {
  const locationCoords = useLocationCoordinates();
  const { locationData, /* locationError, weatherError, */ isLoadingWeather, modifiedWeatherData, } = useLocationAndWeatherData(locationCoords);

  return (
    <div>
      {
        isLoadingWeather ?
          <div className="spinner-wrapper">
            <div className='spinner' />
          </div>
          :
          <Fragment>
            <CurrentWeatherSection currentWeather={modifiedWeatherData?.currentWeather} locationData={locationData} />
            <HourlyForecastSection forecast={modifiedWeatherData?.forecast} />
            <DailyForecastSection forecast={modifiedWeatherData?.forecast} />
          </Fragment>
      }
    </div>
  );
};