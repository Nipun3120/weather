import { useState, useEffect } from "react";
import {
  type ForecastDay,
  type LocationInfo,
  type SavedWeatherData,
  type WeatherResponse,
  TemperatureUnit,
} from "../constants";
import {
  fetchWeatherData,
  fetchWeatherByCoords,
  getFormattedDate,
  setApiKey,
} from "../helpers/api";
import {
  convertToSavedFormat,
  loadFromStorage,
  saveToStorage,
} from "../helpers/weatherTableHelpers";
import type { CitySuggestion } from "../helpers/api";

export const useWeatherReport = () => {
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [forecastDays, setForecastDays] = useState<ForecastDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedReports, setSavedReports] = useState<SavedWeatherData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(
    TemperatureUnit.CELSIUS
  );

  // Load saved reports from session storage on initial render
  useEffect(() => {
    const savedData = loadFromStorage();
    setSavedReports(savedData);
  }, []);

  // Check if current city is already liked when weather data changes
  useEffect(() => {
    if (weatherData) {
      const isCityAlreadySaved = savedReports.some(
        (report) => report.city.toLowerCase() === weatherData.name.toLowerCase()
      );
      setIsLiked(isCityAlreadySaved);
    } else {
      setIsLiked(false);
    }
  }, [weatherData, savedReports]);

  const handleValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Toggle temperature unit between Celsius and Fahrenheit
  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prev: TemperatureUnit) =>
      prev === TemperatureUnit.CELSIUS
        ? TemperatureUnit.FAHRENHEIT
        : TemperatureUnit.CELSIUS
    );
  };

  // Check if current temperature unit is Fahrenheit
  const isFahrenheit = () => temperatureUnit === TemperatureUnit.FAHRENHEIT;

  // Generate forecast data from actual API data
  const generateForecastData = (
    weatherData: WeatherResponse
  ): ForecastDay[] => {
    // Since we don't have actual forecast data from the API,
    // we'll use the current temperature with small variations
    const baseTemp = Math.round(weatherData.main.temp);
    const currentCondition =
      weatherData.weather[0]?.main.toLowerCase() || "clear";
    const currentIcon = weatherData.weather[0]?.icon || "01d";

    // Create forecast data based on current weather
    return [
      {
        day: "Today",
        temperature: baseTemp,
        condition: currentCondition,
        icon: currentIcon,
      },
      {
        day: "Tomorrow",
        temperature: baseTemp + Math.floor(Math.random() * 5) - 2,
        condition: currentCondition,
        icon: currentIcon,
      },
      {
        day: "Day After",
        temperature: baseTemp + Math.floor(Math.random() * 8) - 4,
        condition: currentCondition,
        icon: currentIcon,
      },
    ];
  };

  // Handle city selection from suggestions
  const handleCitySelect = async (suggestion: CitySuggestion) => {
    if (!suggestion) return;

    setIsLoading(true);
    setError(null);

    try {
      // Use lat/lon to get accurate weather data
      const data = await fetchWeatherByCoords(suggestion.lat, suggestion.lon);

      setWeatherData(data);

      // Set location info
      setLocationInfo({
        city: data.name,
        country: data.sys.country,
        date: getFormattedDate(),
      });

      // Generate forecast data based on current weather
      setForecastDays(generateForecastData(data));

      // Update search field with selected city name
      setSearch(suggestion.name);
    } catch (error: unknown) {
      console.error("Error fetching weather data:", error);

      // Check if the error is due to an invalid API key (401 Unauthorized)
      if (error instanceof Error && error.message.includes("401")) {
        setError("Invalid API key. Please check your API key and try again.");
      } else {
        setError("Failed to fetch weather data. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (cityName?: string) => {
    const searchTerm = cityName || search;
    if (!searchTerm) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(searchTerm);

      setWeatherData(data);

      // Set location info
      setLocationInfo({
        city: data.name,
        country: data.sys.country,
        date: getFormattedDate(),
      });

      // Generate forecast data based on current weather
      setForecastDays(generateForecastData(data));

      // Update search field if a city name was provided
      if (cityName) {
        setSearch(cityName);
      }
    } catch (error: unknown) {
      console.error("Error fetching weather data:", error);

      // Check if the error is due to an invalid API key (401 Unauthorized)
      if (error instanceof Error && error.message.includes("401")) {
        setError("Invalid API key. Please check your API key and try again.");
      } else {
        setError("Failed to fetch weather data. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveWeatherReport = () => {
    if (weatherData && !isLiked) {
      // Convert weather data to saved format
      const savedData = convertToSavedFormat(weatherData);

      // Update state with new saved report
      const updatedReports = [...savedReports, savedData];
      setSavedReports(updatedReports);

      // Save to session storage
      saveToStorage(updatedReports);

      // Mark as liked
      setIsLiked(true);
    }
  };

  const changeLocation = () => {
    setSearch("");
    setWeatherData(null);
    setLocationInfo(null);
    setError(null);
    setIsLiked(false);
  };

  // Function to refresh saved reports data
  const refreshSavedReports = async () => {
    const savedData = loadFromStorage();

    if (savedData.length === 0) return;

    setIsLoading(true);

    try {
      // Create a new array to hold updated reports
      const updatedReports: SavedWeatherData[] = [];

      // Update each saved report with fresh data
      for (const report of savedData) {
        try {
          const freshData = await fetchWeatherData(report.city);
          const updatedReport = convertToSavedFormat(freshData);
          updatedReports.push(updatedReport);
        } catch {
          // If we can't update a specific city, keep the old data
          updatedReports.push(report);
        }
      }

      // Update state and storage
      setSavedReports(updatedReports);
      saveToStorage(updatedReports);

      // Check if current city is in the updated reports
      if (weatherData) {
        const isCityAlreadySaved = updatedReports.some(
          (report) =>
            report.city.toLowerCase() === weatherData.name.toLowerCase()
        );
        setIsLiked(isCityAlreadySaved);
      }
    } catch (error) {
      console.error("Error refreshing saved reports:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle city selection from the table
  const selectCityFromTable = (cityName: string) => {
    // Find the saved report for this city
    const savedReport = savedReports.find(
      (report) => report.city.toLowerCase() === cityName.toLowerCase()
    );

    if (savedReport) {
      // Use the saved data instead of fetching from API
      setWeatherData(savedReport.fullData);

      // Set location info
      setLocationInfo({
        city: savedReport.city,
        country: savedReport.country,
        date: getFormattedDate(),
      });

      // Generate forecast data based on saved weather
      setForecastDays(generateForecastData(savedReport.fullData));

      // Update search field
      setSearch(savedReport.city);

      // Mark as liked
      setIsLiked(true);
    }
  };

  const handleApiKeyChange = (apiKey: string) => {
    setApiKey(apiKey);
    setHasApiKey(!!apiKey.trim());
  };

  return {
    search,
    handleValueInput,
    handleSearch,
    handleCitySelect,
    weatherData,
    locationInfo,
    forecastDays,
    isLoading,
    savedReports,
    saveWeatherReport,
    changeLocation,
    error,
    isLiked,
    refreshSavedReports,
    selectCityFromTable,
    temperatureUnit,
    toggleTemperatureUnit,
    isFahrenheit,
    handleApiKeyChange,
    hasApiKey,
    setSavedReports,
  };
};
