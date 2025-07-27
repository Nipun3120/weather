import { Heart, Sun } from "phosphor-react";
import { CONDITION_TO_ICON_MAP, WEATHER_DETAIL_FIELDS } from "./constants";
import { useWeatherData } from "./hooks/useWeatherData";
import { TemperatureToggle } from "../TemperatureToggle";
import { formatTemperature } from "../../helpers/temperatureHelpers";
import type {
  LocationInfo,
  TemperatureUnit,
  WeatherResponse,
} from "../../constants";

interface WeatherDataProps {
  weatherData: WeatherResponse;
  locationInfo: LocationInfo;
  onChangeLocation: () => void;
  saveWeatherReport: () => void;
  isLiked: boolean;
  temperatureUnit: TemperatureUnit;
  toggleTemperatureUnit: () => void;
  isFahrenheit: () => boolean;
}

const getWeatherIcon = (condition?: string): React.ReactNode => {
  if (!condition || !CONDITION_TO_ICON_MAP[condition.toLowerCase()]) {
    return <Sun size={48} weight="fill" className="text-white" />;
  }
  return CONDITION_TO_ICON_MAP[condition.toLowerCase()];
};

export const WeatherDataPreview = ({
  weatherData,
  locationInfo,
  onChangeLocation,
  saveWeatherReport,
  isLiked,
  temperatureUnit,
  toggleTemperatureUnit,
  isFahrenheit,
}: WeatherDataProps) => {
  const { windDirection, temperature, weatherCondition } = useWeatherData({
    weatherData,
  });

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex justify-start mb-2">
        <TemperatureToggle
          temperatureUnit={temperatureUnit}
          toggleTemperatureUnit={toggleTemperatureUnit}
        />
      </div>

      <div className="flex rounded-lg overflow-hidden">
        {/* Left panel with main weather info */}
        <div className="w-[380px] bg-gradient-to-br from-cyan-300 to-blue-500 p-6 flex flex-col justify-between">
          <div className="text-white">
            <h2 className="text-2xl font-bold">
              {locationInfo.date.split(",")[0]}
            </h2>
            <p className="text-lg">
              {locationInfo.date.split(",").slice(1).join(",").trim()}
            </p>
          </div>

          <div className="text-white flex items-center">
            <span className="text-xs">📍</span>
            <span className="ml-1 text-2xl font-semibold">
              {locationInfo.city}, {locationInfo.country}
            </span>
          </div>

          <div className="text-white flex flex-col items-center">
            {getWeatherIcon(weatherCondition)}
            <div className="mt-2">
              <span className="text-6xl font-bold">
                {formatTemperature(temperature, isFahrenheit())}
              </span>
            </div>
            <div className="mt-1">
              <span className="text-xl">{weatherCondition}</span>
            </div>
          </div>
        </div>

        {/* Right panel with weather details */}
        <div className="w-[380px] bg-gray-800 p-6 flex flex-col justify-between">
          <div className="text-white grid grid-cols-2 gap-4">
            {WEATHER_DETAIL_FIELDS.map((field) => (
              <div key={field.id}>
                <h3 className="text-lg uppercase">{field.label}</h3>
                <div className="text-2xl">
                  {field.getValue(weatherData, windDirection)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between items-center space-x-3">
        <button
          onClick={onChangeLocation}
          className="w-full bg-gradient-to-r from-cyan-300 to-blue-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
          📍 Change location
        </button>

        <button
          onClick={saveWeatherReport}
          disabled={isLiked}
          className={`p-2 border border-white rounded-lg cursor-not-allowed ${
            !isLiked && "cursor-pointer"
          }`}>
          <Heart
            size={32}
            className=""
            weight={isLiked ? "fill" : "regular"}
            fill={isLiked ? "#ff0000" : ""}
          />
        </button>
      </div>
    </div>
  );
};
