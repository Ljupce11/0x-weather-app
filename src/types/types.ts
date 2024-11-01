export type LocationData = {
  address: {
    city?: string;
  };
} | null;

export type CurrentWeather = {
  location: {
    latitude: number;
    longitude: number;
  };
  temp: string;
  cond: number;
  range: {
    min: string;
    max: string;
  };
};

export type HourlyForecast = {
  datetime: string;
  temperature: string;
  conditions: number;
}

export type DailyForecast = {
  datetime: string;
  range: {
    min: string;
    max: string;
  };
  newRange: {
    min: number;
    max: number;
  };
}

export type Forecast = {
  hourly: HourlyForecast[];
  daily: DailyForecast[];
};

export type WeatherData = {
  current: {
    temperature_2m: number;
    weathercode: number;
  },
  hourly: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
  },
  daily: {
    time: string[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
  }
}

export type LocationCoordinates = {
  latitude: number;
  longitude: number;
} | null
