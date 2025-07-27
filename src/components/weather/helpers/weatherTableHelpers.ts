import { STORAGE_KEY, WindDirection } from "../constants";
import type { SavedWeatherData, WeatherResponse } from "../constants";
import { v4 as uuidv4 } from "uuid";

/**
 * Converts wind direction in degrees to cardinal direction
 */
export const degreesToCardinal = (degrees: number): WindDirection => {
  // Define direction ranges
  const directions: WindDirection[] = [
    WindDirection.N,
    WindDirection.NNE,
    WindDirection.NE,
    WindDirection.ENE,
    WindDirection.E,
    WindDirection.ESE,
    WindDirection.SE,
    WindDirection.SSE,
    WindDirection.S,
    WindDirection.SSW,
    WindDirection.SW,
    WindDirection.WSW,
    WindDirection.W,
    WindDirection.WNW,
    WindDirection.NW,
    WindDirection.NNW,
  ];

  // Calculate the index in the directions array
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * Formats a timestamp to a localized date and time string
 */
export const formatLocalTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Converts a WeatherResponse to SavedWeatherData format
 */
export const convertToSavedFormat = (
  weatherData: WeatherResponse
): SavedWeatherData => {
  return {
    id: uuidv4(),
    city: weatherData.name,
    country: weatherData.sys.country,
    timestamp: weatherData.dt,
    temperature: Math.round(weatherData.main.temp),
    humidity: weatherData.main.humidity,
    windSpeed: weatherData.wind.speed,
    windDirection: weatherData.wind.deg,
    condition: weatherData.weather[0]?.main || "",
    icon: weatherData.weather[0]?.icon || "",
    fullData: weatherData,
  };
};

/**
 * Saves weather data to session storage
 */
export const saveToStorage = (data: SavedWeatherData[]): void => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * Loads weather data from session storage
 */
export const loadFromStorage = (): SavedWeatherData[] => {
  const data = sessionStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
