import { MagnifyingGlass } from "phosphor-react";
import { type CitySuggestion } from "../../helpers/api";
import { useInput } from "./hooks/useInput";

interface WeatherInputFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  handleValueInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCitySelect: (city: CitySuggestion) => void;
  search: string;
  isLoading: boolean;
  error: string | null;
}

export const WeatherInput: React.FC<WeatherInputFormProps> = ({
  handleSubmit,
  handleValueInput,
  handleCitySelect,
  search,
  isLoading,
  error,
}) => {
  const {
    inputRef,
    suggestionsRef,
    showSuggestions,
    setShowSuggestions,
    handleKeyDown,
    handleSelectSuggestion,
    setSuggestions,
    suggestions,
    isLoadingSuggestions,
    selectedIndex,
  } = useInput({ search, handleSubmit, handleCitySelect });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter City"
          onChange={handleValueInput}
          onKeyDown={handleKeyDown}
          onFocus={() =>
            search.length >= 3 &&
            setSuggestions.length > 0 &&
            setShowSuggestions(true)
          }
          value={search}
          className="bg-white text-black p-4 pl-10 rounded-lg text-lg w-full"
          autoComplete="off"
        />
        <MagnifyingGlass
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />

        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
            {isLoadingSuggestions ? (
              <div className="p-3 text-gray-400 text-center">
                Loading suggestions...
              </div>
            ) : suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => (
                <div
                  key={`${suggestion.name}-${suggestion.lat}-${suggestion.lon}`}
                  className={`p-3 cursor-pointer ${
                    index === selectedIndex
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => handleSelectSuggestion(suggestion)}>
                  <div className="font-medium text-white">
                    {suggestion.name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {suggestion.state}, {suggestion.country}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-gray-400 text-center">
                No results found
              </div>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-gray-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-600 border border-gray-600 text-lg font-medium transition-colors"
        disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>

      {error && <div className="mt-2 text-red-400 text-center">{error}</div>}
    </form>
  );
};
