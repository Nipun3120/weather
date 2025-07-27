/**
 * Converts temperature from Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

/**
 * Formats temperature with the appropriate unit symbol
 */
export const formatTemperature = (
  temperature: number,
  isFahrenheit: boolean
): string => {
  if (isFahrenheit) {
    const fahrenheit = celsiusToFahrenheit(temperature);
    return `${Math.round(fahrenheit)}°F`;
  }
  return `${Math.round(temperature)}°C`;
};
