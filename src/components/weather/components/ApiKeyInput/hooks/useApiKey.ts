import { useState, useEffect, useCallback } from "react";
import { API_KEY_STORAGE_KEY, OPENWEATHERMAP_API_URL } from "../constants";

export const useApiKey = (onApiKeyChange: (apiKey: string) => void) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const storedApiKey = sessionStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedApiKey) {
      setApiKey(storedApiKey);
      onApiKeyChange(storedApiKey);
    } else {
      setIsEditing(true);
    }
  }, [onApiKeyChange]);

  const saveApiKey = useCallback(() => {
    if (apiKey.trim()) {
      sessionStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
      onApiKeyChange(apiKey);
      setIsEditing(false);
    }
  }, [apiKey, onApiKeyChange]);

  const toggleEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleOpenWeatherMapNavigate = useCallback(() => {
    window.open(OPENWEATHERMAP_API_URL, "_blank");
  }, []);

  return {
    apiKey,
    setApiKey,
    saveApiKey,
    isEditing,
    toggleEditing,
    handleOpenWeatherMapNavigate,
  };
};
