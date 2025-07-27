import React from "react";
import { formatLocalTime } from "../../helpers/weatherTableHelpers";
import { formatTemperature } from "../../helpers/temperatureHelpers";
import { useWeatherTable } from "./hooks/useWeatherTable";
import { TABLE_COLUMNS } from "./constants";
import { ArrowsClockwise, Trash } from "phosphor-react";
import { TemperatureUnit, type SavedWeatherData } from "../../constants";

interface WeatherTableProps {
  savedData: SavedWeatherData[];
  onCitySelect: (cityName: string) => void;
  temperatureUnit?: TemperatureUnit;
  refreshSavedReports: () => void;
  savedReports: SavedWeatherData[];
  setSavedReports: React.Dispatch<React.SetStateAction<SavedWeatherData[]>>;
}

export const WeatherTable: React.FC<WeatherTableProps> = ({
  savedData,
  onCitySelect,
  temperatureUnit = TemperatureUnit.CELSIUS,
  refreshSavedReports,
  savedReports,
  setSavedReports,
}) => {
  const {
    sortedData,
    getSortIndicator,
    requestSort,
    isFahrenheit,
    handleCityClick,
    clearStoredData,
  } = useWeatherTable({
    data: savedData,
    temperatureUnit,
    onCitySelect,
    setSavedReports,
  });

  if (sortedData.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 text-center">
        <h3 className="text-xl text-white font-medium mb-2">
          No Saved Weather Data
        </h3>
        <p className="text-gray-400">
          Click the "Like" button to save weather information for a location.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Saved Weather Reports
        </h2>
        {savedReports.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={refreshSavedReports}
              className="border border-gray-900 hover:bg-gray-900 text-white p-2 rounded-md flex items-center transition-colors cursor-pointer">
              <ArrowsClockwise size={20} />
            </button>
            <button
              className="border border-gray-900 hover:bg-gray-900 text-white p-2 rounded-md flex items-center transition-colors cursor-pointer"
              onClick={clearStoredData}>
              <Trash size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Desktop table view - hidden on mobile */}
      <div className="hidden sm:block bg-gray-800 rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-700">
            <tr>
              {TABLE_COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    requestSort(column.key as keyof SavedWeatherData)
                  }>
                  {column.label}
                  {getSortIndicator(column.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {sortedData.map((item: SavedWeatherData, index: number) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {index + 1}
                </td>
                <td
                  className="px-4 py-3 whitespace-nowrap text-sm text-blue-400 hover:text-blue-300 cursor-pointer"
                  onClick={() => handleCityClick(item.city)}>
                  {item.city}, {item.country}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {formatLocalTime(item.timestamp)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {formatTemperature(item.temperature, isFahrenheit)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {item.humidity}%
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                  {item.windSpeed} km/h
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view - shown only on mobile */}
      <div className="sm:hidden space-y-3">
        {sortedData.map((item: SavedWeatherData) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <div
              className="text-blue-400 font-medium mb-1 cursor-pointer"
              onClick={() => handleCityClick(item.city)}>
              {item.city}, {item.country}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-400">Temperature:</span>
                <span className="text-gray-300 ml-1">
                  {formatTemperature(item.temperature, isFahrenheit)}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Humidity:</span>
                <span className="text-gray-300 ml-1">{item.humidity}%</span>
              </div>
              <div>
                <span className="text-gray-400">Wind Speed:</span>
                <span className="text-gray-300 ml-1">
                  {item.windSpeed} km/h
                </span>
              </div>
              <div>
                <span className="text-gray-400">Condition:</span>
                <span className="text-gray-300 ml-1">{item.condition}</span>
              </div>
              <div className="col-span-2">
                <span className="text-gray-400">Updated:</span>
                <span className="text-gray-300 ml-1">
                  {formatLocalTime(item.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
