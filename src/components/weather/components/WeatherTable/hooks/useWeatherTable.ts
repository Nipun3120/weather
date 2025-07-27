import { useState, useMemo, useCallback } from "react";
import {
  STORAGE_KEY,
  TemperatureUnit,
  type SavedWeatherData,
} from "../../../constants";

type Direction = "ascending" | "descending";

interface SortConfig {
  key: keyof SavedWeatherData;
  direction: Direction;
}

export const useWeatherTable = ({
  data,
  temperatureUnit,
  onCitySelect,
  setSavedReports,
}: {
  data: SavedWeatherData[];
  temperatureUnit: TemperatureUnit;
  onCitySelect: (cityName: string) => void;
  setSavedReports: React.Dispatch<React.SetStateAction<SavedWeatherData[]>>;
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const requestSort = useCallback(
    (key: keyof SavedWeatherData) => {
      let direction: Direction = "ascending";

      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "ascending"
      ) {
        direction = "descending";
      }

      setSortConfig({ key, direction });
    },
    [sortConfig]
  );

  const sortedData = useMemo(() => {
    const sortableData = [...data];

    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableData;
  }, [data, sortConfig]);

  const getSortIndicator = useCallback(
    (columnName: string) => {
      if (sortConfig && sortConfig.key === columnName) {
        return sortConfig.direction === "ascending" ? " ↑" : " ↓";
      }
      return "";
    },
    [sortConfig]
  );

  const isFahrenheit = useMemo(
    () => temperatureUnit === TemperatureUnit.FAHRENHEIT,
    [temperatureUnit]
  );

  const handleCityClick = useCallback(
    (cityName: string) => {
      onCitySelect(cityName);
    },
    [onCitySelect]
  );

  const clearStoredData = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setSavedReports([]);
  }, [setSavedReports]);

  return {
    sortedData,
    requestSort,
    getSortIndicator,
    isFahrenheit,
    handleCityClick,
    clearStoredData,
  };
};
