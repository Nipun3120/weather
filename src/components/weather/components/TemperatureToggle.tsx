import React from "react";
import { TemperatureUnit } from "../constants";

interface TemperatureToggleProps {
  temperatureUnit: TemperatureUnit;
  toggleTemperatureUnit: () => void;
}

export const TemperatureToggle: React.FC<TemperatureToggleProps> = ({
  temperatureUnit,
  toggleTemperatureUnit,
}) => {
  const isCelsius = temperatureUnit === TemperatureUnit.CELSIUS;

  return (
    <div className="flex items-center">
      <span className={`mr-2 ${isCelsius ? "text-white" : "text-gray-400"}`}>
        °C
      </span>
      <button
        onClick={toggleTemperatureUnit}
        className="relative inline-flex h-6 w-11 items-center rounded-full"
        aria-pressed={!isCelsius}>
        <span className="sr-only">Toggle temperature unit</span>
        <span
          className={`${
            isCelsius ? "bg-gray-600" : "bg-blue-500"
          } absolute h-6 w-11 rounded-full transition`}
        />
        <span
          className={`${
            isCelsius ? "translate-x-1" : "translate-x-6"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </button>
      <span className={`ml-2 ${!isCelsius ? "text-white" : "text-gray-400"}`}>
        °F
      </span>
    </div>
  );
};
