export type CurrentWeather = {
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  temp: string;
  cond: number;
  range: {
    min: string;
    max: string;
  };
} | null;

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
} | null;