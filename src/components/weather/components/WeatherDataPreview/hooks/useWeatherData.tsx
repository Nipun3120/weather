import { useMemo } from "react";
import { degreesToCardinal } from "../../../helpers/weatherTableHelpers";
import type { WeatherResponse } from "../../../constants";

export const useWeatherData = ({
  weatherData,
}: {
  weatherData: WeatherResponse;
}) => {
  const weatherCondition = useMemo(
    () => weatherData.weather[0]?.main || "Clear",
    [weatherData]
  );
  const temperature = useMemo(
    () => Math.round(weatherData.main.temp),
    [weatherData]
  );
  const windDirection = useMemo(
    () => degreesToCardinal(weatherData.wind.deg),
    [weatherData]
  );

  return {
    windDirection,
    temperature,
    weatherCondition,
  };
};
