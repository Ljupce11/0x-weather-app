import { describe, it, expect } from 'vitest';
import { returnUpdatedCurrentWeatherData } from './returnUpdatedCurrentWeatherData';
import type { WeatherData } from '../../types/types';

describe('returnUpdatedCurrentWeatherData', () => {
  it('should return updated weather data with valid input', () => {
    const latitude = 40.7128;
    const longitude = -74.0060;
    const weatherData: WeatherData = {
      current: {
        temperature_2m: 22.5,
        weathercode: 1
      },
      daily: {
        time: ['2021-09-01'],
        temperature_2m_min: [15.2],
        temperature_2m_max: [25.3]
      },
      hourly: {
        time: ['2021-09-01T00:00:00'],
        temperature_2m: [22.5],
        weathercode: [1]
      }
    };

    const result = returnUpdatedCurrentWeatherData(latitude, longitude, weatherData);

    expect(result).toEqual({
      location: {
        latitude,
        longitude
      },
      temp: '23°',
      cond: 1,
      range: {
        min: '15°',
        max: '25°'
      }
    });
  });

  it('should handle edge case values correctly', () => {
    const latitude = 0;
    const longitude = 0;
    const weatherData: WeatherData = {
      current: {
        temperature_2m: -10.5,
        weathercode: 99
      },
      daily: {
        time: ['2021-09-01'],
        temperature_2m_min: [-20.1],
        temperature_2m_max: [40.7]
      },
      hourly: {
        time: ['2021-09-01T00:00:00'],
        temperature_2m: [-10.5],
        weathercode: [99]
      }
    };

    const result = returnUpdatedCurrentWeatherData(latitude, longitude, weatherData);

    expect(result).toEqual({
      location: {
        latitude,
        longitude
      },
      temp: '-10°',
      cond: 99,
      range: {
        min: '-20°',
        max: '41°'
      }
    });
  });

  it('should handle missing or undefined values gracefully', () => {
    const latitude = 51.5074;
    const longitude = -0.1278;
    const weatherData: WeatherData = {
      current: {
        temperature_2m: undefined,
        weathercode: undefined
      },
      daily: {
        temperature_2m_min: [undefined],
        temperature_2m_max: [undefined]
      }
    };

    const result = returnUpdatedCurrentWeatherData(latitude, longitude, weatherData);

    expect(result).toEqual({
      location: {
        latitude,
        longitude
      },
      temp: 'NaN°',
      cond: undefined,
      range: {
        min: 'NaN°',
        max: 'NaN°'
      }
    });
  });
});