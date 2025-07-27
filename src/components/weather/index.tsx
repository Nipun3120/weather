import {
  WeatherDataPreview,
  WeatherInput,
  WeatherTable,
  ApiKeyInput,
} from "./components";
import { useWeatherReport } from "./hooks/useWeatherReport";

export const Weather = () => {
  const {
    search,
    handleValueInput,
    handleSearch,
    handleCitySelect,
    weatherData,
    locationInfo,
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
  } = useWeatherReport();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="flex flex-col items-center select-none w-full px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">
        Weather App
      </h1>

      <ApiKeyInput onApiKeyChange={handleApiKeyChange} />

      {hasApiKey && (
        <>
          <div className="bg-gray-900 border border-gray-800 p-4 sm:p-6 rounded-lg w-full max-w-3xl shadow-xl">
            {!weatherData ? (
              <WeatherInput
                handleSubmit={handleSubmit}
                handleValueInput={handleValueInput}
                handleCitySelect={handleCitySelect}
                search={search}
                isLoading={isLoading}
                error={error}
              />
            ) : (
              weatherData &&
              locationInfo && (
                <>
                  <WeatherDataPreview
                    weatherData={weatherData}
                    locationInfo={locationInfo}
                    onChangeLocation={changeLocation}
                    saveWeatherReport={saveWeatherReport}
                    isLiked={isLiked}
                    temperatureUnit={temperatureUnit}
                    toggleTemperatureUnit={toggleTemperatureUnit}
                    isFahrenheit={isFahrenheit}
                  />
                </>
              )
            )}
          </div>

          <div className="w-full max-w-3xl mt-4 sm:mt-6">
            <WeatherTable
              savedData={savedReports}
              onCitySelect={selectCityFromTable}
              temperatureUnit={temperatureUnit}
              refreshSavedReports={refreshSavedReports}
              savedReports={savedReports}
              setSavedReports={setSavedReports}
            />
          </div>
        </>
      )}
    </div>
  );
};
