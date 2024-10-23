type WeatherCondition = {
  code: number;
  description: string;
};

// Define the mapping of Open-meteo weather codes to descriptions
const weatherConditions: WeatherCondition[] = [
  { code: 0, description: "Clear sky" },
  { code: 1, description: "Mainly clear" },
  { code: 2, description: "Partly cloudy" },
  { code: 3, description: "Overcast" },
  { code: 45, description: "Fog" },
  { code: 48, description: "Depositing rime fog" },
  { code: 51, description: "Drizzle: Light intensity" },
  { code: 53, description: "Drizzle: Moderate intensity" },
  { code: 55, description: "Drizzle: Dense intensity" },
  { code: 56, description: "Freezing drizzle: Light" },
  { code: 57, description: "Freezing drizzle: Dense intensity" },
  { code: 61, description: "Rain: Slight intensity" },
  { code: 63, description: "Rain: Moderate intensity" },
  { code: 65, description: "Rain: Heavy intensity" },
  { code: 66, description: "Freezing rain: Light" },
  { code: 67, description: "Freezing rain: Heavy intensity" },
  { code: 71, description: "Snow fall: Slight intensity" },
  { code: 73, description: "Snow fall: Moderate intensity" },
  { code: 75, description: "Snow fall: Heavy intensity" },
  { code: 77, description: "Snow grains" },
  { code: 80, description: "Rain showers: Slight" },
  { code: 81, description: "Rain showers: Moderate" },
  { code: 82, description: "Rain showers: Violent" },
  { code: 85, description: "Snow showers: Slight" },
  { code: 86, description: "Snow showers: Heavy" },
  { code: 95, description: "Thunderstorm: Slight or moderate" },
  { code: 96, description: "Thunderstorm with slight hail" },
  { code: 99, description: "Thunderstorm with heavy hail" }
];

// Map weather codes to descriptions
export const getWeatherDescriptions = (codes: number[]): string[] => {
  return codes.map(code => {
    const condition = weatherConditions.find(condition => condition.code === code);
    return condition ? condition.description : "Unknown condition";
  });
}