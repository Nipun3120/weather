import { useMemo } from "react";
import type { WeatherResponse } from "../../../constants";
import { degreesToCardinal } from "../../../helpers/weatherTableHelpers";

interface UseWeatherDataProps {
  weatherData: WeatherResponse;
}

export const useWeatherData = ({ weatherData }: UseWeatherDataProps) => {
  // Get wind direction as cardinal direction
  const windDirection = useMemo(() => {
    return degreesToCardinal(weatherData.wind.deg);
  }, [weatherData.wind.deg]);

  // Get temperature rounded to nearest integer
  const temperature = useMemo(() => {
    return Math.round(weatherData.main.temp);
  }, [weatherData.main.temp]);

  // Get weather condition from API data
  const weatherCondition = useMemo(() => {
    return weatherData.weather[0]?.main || "Clear";
  }, [weatherData.weather]);

  return {
    windDirection,
    temperature,
    weatherCondition,
  };
};
