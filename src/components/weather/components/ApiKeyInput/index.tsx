import React from "react";
import { useApiKey } from "./hooks/useApiKey";

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeyChange }) => {
  const {
    apiKey,
    setApiKey,
    saveApiKey,
    isEditing,
    toggleEditing,
    handleOpenWeatherMapNavigate,
  } = useApiKey(onApiKeyChange);

  return (
    <div className="mb-4 sm:mb-6 flex items-center justify-center w-full">
      <div className="bg-gray-900 border border-gray-800 p-3 sm:p-4 rounded-lg w-full max-w-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-grow mr-0 sm:mr-4 mb-3 sm:mb-0">
            <label
              htmlFor="apiKey"
              className="text-sm font-medium text-gray-400 mb-1 sm:mb-2 flex items-center gap-1">
              OpenWeatherMap API Key{" "}
              <a
                onClick={handleOpenWeatherMapNavigate}
                className="!text-blue-300 cursor-pointer">
                (Generate)
              </a>
            </label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={!isEditing}
              placeholder="Enter your API key"
              className={`w-full bg-gray-800 text-white border ${
                isEditing
                  ? "border-blue-500"
                  : "border-gray-700 cursor-not-allowed"
              } rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <button
            disabled={apiKey.length === 0}
            onClick={isEditing ? saveApiKey : toggleEditing}
            className={`px-4 py-2 mt-7 rounded-md cursor-pointer disabled:cursor-not-allowed ${
              isEditing
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white transition-colors w-full sm:w-auto`}>
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};
