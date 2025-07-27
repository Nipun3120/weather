import React from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "phosphor-react";
import type { WeatherResponse } from "../../constants";

// Object map for condition to icon component
export const CONDITION_TO_ICON_MAP: Record<string, React.ReactNode> = {
  sunny: <Sun size={48} weight="fill" className="text-white" />,
  "partly-cloudy": <Cloud size={48} weight="fill" className="text-white" />,
  cloudy: <Cloud size={48} weight="fill" className="text-white" />,
  rainy: <CloudRain size={48} weight="fill" className="text-white" />,
  "rainy-heavy": (
    <CloudLightning size={48} weight="fill" className="text-white" />
  ),
  snowy: <Snowflake size={48} weight="fill" className="text-white" />,
  misty: <CloudFog size={48} weight="fill" className="text-white" />,
  clouds: <Cloud size={48} weight="fill" className="text-white" />,
  clear: <Sun size={48} weight="fill" className="text-white" />,
  rain: <CloudRain size={48} weight="fill" className="text-white" />,
  thunderstorm: (
    <CloudLightning size={48} weight="fill" className="text-white" />
  ),
  snow: <Snowflake size={48} weight="fill" className="text-white" />,
  mist: <CloudFog size={48} weight="fill" className="text-white" />,
  fog: <CloudFog size={48} weight="fill" className="text-white" />,
  haze: <CloudFog size={48} weight="fill" className="text-white" />,
};

// Wind direction icon map
export const WIND_DIRECTION_ICONS: Record<string, React.ReactNode> = {
  N: <ArrowUp size={24} weight="bold" className="text-white" />,
  NNE: (
    <ArrowUp size={24} weight="bold" className="rotate-[22.5deg] text-white" />
  ),
  NE: <ArrowUp size={24} weight="bold" className="rotate-45 text-white" />,
  ENE: (
    <ArrowUp size={24} weight="bold" className="rotate-[67.5deg] text-white" />
  ),
  E: <ArrowRight size={24} weight="bold" className="text-white" />,
  ESE: (
    <ArrowDown
      size={24}
      weight="bold"
      className="rotate-[247.5deg] text-white"
    />
  ),
  SE: (
    <ArrowDown size={24} weight="bold" className="rotate-[225deg] text-white" />
  ),
  SSE: (
    <ArrowDown
      size={24}
      weight="bold"
      className="rotate-[202.5deg] text-white"
    />
  ),
  S: <ArrowDown size={24} weight="bold" className="text-white" />,
  SSW: (
    <ArrowDown
      size={24}
      weight="bold"
      className="rotate-[157.5deg] text-white"
    />
  ),
  SW: (
    <ArrowDown size={24} weight="bold" className="rotate-[135deg] text-white" />
  ),
  WSW: (
    <ArrowDown
      size={24}
      weight="bold"
      className="rotate-[112.5deg] text-white"
    />
  ),
  W: <ArrowLeft size={24} weight="bold" className="text-white" />,
  WNW: (
    <ArrowUp size={24} weight="bold" className="rotate-[292.5deg] text-white" />
  ),
  NW: (
    <ArrowUp size={24} weight="bold" className="rotate-[315deg] text-white" />
  ),
  NNW: (
    <ArrowUp size={24} weight="bold" className="rotate-[337.5deg] text-white" />
  ),
};

// Weather detail field types
export enum WeatherDetailField {
  PRECIPITATION = "precipitation",
  HUMIDITY = "humidity",
  PRESSURE = "pressure",
  SEA_LEVEL = "sea_level",
  WIND_SPEED = "wind_speed",
  WIND_DIRECTION = "wind_direction",
}

// Field configuration for weather details
export interface WeatherDetailConfig {
  id: WeatherDetailField;
  label: string;
  getValue: (data: WeatherResponse, windDirection?: string) => React.ReactNode;
}

// Weather detail fields configuration
export const WEATHER_DETAIL_FIELDS: WeatherDetailConfig[] = [
  {
    id: WeatherDetailField.PRECIPITATION,
    label: "Precipitation",
    getValue: (data) => `${data.clouds.all} %`,
  },
  {
    id: WeatherDetailField.HUMIDITY,
    label: "Humidity",
    getValue: (data) => `${data.main.humidity} %`,
  },
  {
    id: WeatherDetailField.PRESSURE,
    label: "Pressure",
    getValue: (data) => `${data.main.pressure} hPa`,
  },
  {
    id: WeatherDetailField.SEA_LEVEL,
    label: "Sea Level",
    getValue: (data) => `${data.main.sea_level || data.main.pressure} m`,
  },
  {
    id: WeatherDetailField.WIND_SPEED,
    label: "Wind Speed",
    getValue: (data) => `${Math.round(data.wind.speed)} km/h`,
  },
  {
    id: WeatherDetailField.WIND_DIRECTION,
    label: "Wind Direction",
    getValue: (_, windDirection) => (
      <div className="flex items-center">
        {windDirection && WIND_DIRECTION_ICONS[windDirection]}
        <span className="ml-2 text-2xl">{windDirection}</span>
      </div>
    ),
  },
];
