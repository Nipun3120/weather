import { useEffect, useRef, useState } from "react";
import {
  fetchCitySuggestions,
  type CitySuggestion,
} from "../../../helpers/api";

export const useInput = ({
  search,
  handleSubmit,
  handleCitySelect,
}: {
  search: string;
  handleSubmit: (e: React.FormEvent) => void;
  handleCitySelect: (city: CitySuggestion) => void;
}) => {
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // debounce input
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (search.length >= 3) {
        fetchSuggestions(search);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [search]);

  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 3) return;

    setIsLoadingSuggestions(true);
    try {
      const results = await fetchCitySuggestions(query);
      setSuggestions(results);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelectSuggestion(suggestions[selectedIndex]);
        } else {
          handleSubmit(e as unknown as React.FormEvent);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        break;
      default:
        break;
    }
  };

  const handleSelectSuggestion = (suggestion: CitySuggestion) => {
    handleCitySelect(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
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
  };
};
