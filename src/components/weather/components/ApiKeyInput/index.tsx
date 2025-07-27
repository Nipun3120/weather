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
    <div className="mb-6 flex items-center justify-center w-full">
      <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg flex items-center w-[800px]">
        <div className="flex-grow mr-4">
          <label
            htmlFor="apiKey"
            className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-1">
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
          className={`px-4 mt-7 py-2 rounded-md cursor-pointer disabled:cursor-not-allowed ${
            isEditing
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white transition-colors`}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};
