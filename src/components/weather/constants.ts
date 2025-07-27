export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export enum TemperatureUnit {
  CELSIUS = "celsius",
  FAHRENHEIT = "fahrenheit",
}

export enum WeatherCondition {
  SUNNY = "sunny",
  PARTLY_CLOUDY = "partly-cloudy",
  CLOUDY = "cloudy",
  RAINY = "rainy",
  RAINY_HEAVY = "rainy-heavy",
  SNOWY = "snowy",
  MISTY = "misty",
}

export interface ForecastDay {
  day: string;
  temperature: number;
  condition: string;
  icon: string;
}

export interface LocationInfo {
  city: string;
  country: string;
  date: string;
}

export interface SavedWeatherData {
  id: string;
  city: string;
  country: string;
  timestamp: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  condition: string;
  icon: string;
  fullData: WeatherResponse;
}

export const ICON_TO_CONDITION_MAP: Record<string, WeatherCondition> = {
  "01": WeatherCondition.SUNNY,
  "02": WeatherCondition.PARTLY_CLOUDY,
  "03": WeatherCondition.CLOUDY,
  "04": WeatherCondition.CLOUDY,
  "09": WeatherCondition.RAINY,
  "10": WeatherCondition.RAINY,
  "11": WeatherCondition.RAINY_HEAVY,
  "13": WeatherCondition.SNOWY,
  "50": WeatherCondition.MISTY,
};

export const STORAGE_KEY = "saved_weather_data";

export enum WindDirection {
  N = "N",
  NNE = "NNE",
  NE = "NE",
  ENE = "ENE",
  E = "E",
  ESE = "ESE",
  SE = "SE",
  SSE = "SSE",
  S = "S",
  SSW = "SSW",
  SW = "SW",
  WSW = "WSW",
  W = "W",
  WNW = "WNW",
  NW = "NW",
  NNW = "NNW",
}
