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
    <div className="flex flex-col items-center select-none">
      <h1 className="text-3xl font-bold text-white mb-6">Weather App</h1>

      <ApiKeyInput onApiKeyChange={handleApiKeyChange} />

      {hasApiKey && (
        <>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg w-[800px] shadow-xl">
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

          <div className="w-[800px] mt-6">
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
