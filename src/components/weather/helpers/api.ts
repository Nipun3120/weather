import {
  ICON_TO_CONDITION_MAP,
  WeatherCondition,
  type WeatherResponse,
} from "../constants";

let currentApiKey = "";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

export interface CitySuggestion {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
  local_names?: Record<string, string>;
}

export const setApiKey = (newApiKey: string) => {
  currentApiKey = newApiKey;
};

export const getApiKey = (): string => {
  return currentApiKey;
};

export const fetchCitySuggestions = async (
  query: string,
  limit: number = 5
): Promise<CitySuggestion[]> => {
  if (!query || query.length < 3) return [];

  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(
        query
      )}&limit=${limit}&appid=${getApiKey()}`
    );

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();
    return data as CitySuggestion[];
  } catch (error) {
    console.error("Failed to fetch city suggestions:", error);
    return [];
  }
};

export const fetchWeatherData = async (
  city: string
): Promise<WeatherResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(
        city
      )}&appid=${getApiKey()}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    return data as WeatherResponse;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error;
  }
};

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherResponse> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${getApiKey()}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    return data as WeatherResponse;
  } catch (error) {
    console.error("Failed to fetch weather data by coordinates:", error);
    throw error;
  }
};

export const getConditionFromIcon = (iconCode: string): string => {
  // First two characters determine the icon type
  const code = iconCode.substring(0, 2);
  return ICON_TO_CONDITION_MAP[code] || WeatherCondition.SUNNY;
};

export const getFormattedDate = (): string => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export const getDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", { weekday: "short" });
};
