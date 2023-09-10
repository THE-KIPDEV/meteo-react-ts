export type Meteo = {
  alerts: Alert[];
  current: Current;
  daily: Daily[];
  hourly: Hourly[];
  lat: number;
  lon: number;
  minutely: Minutely[];
  timezone: string;
  timezone_offset: number;
};

export type Alert = {
  description: string;
  end: number;
  event: string;
  sender_name: string;
  start: number;
  tags: string[];
};

export type Current = {
  clouds: number;
  dew_point: number;
  dt: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  weather: Weather[];
  wind_deg: number;
  wind_speed: number;
};

export type Weather = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

export type Daily = {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: FeelsLike;
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  summary: string;
  sunrise: number;
  sunset: number;
  temp: Temp;
  uvi: number;
  weather: Weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
};

export type FeelsLike = {
  day: number;
  eve: number;
  morn: number;
  night: number;
};

export type Temp = {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
};

export type Hourly = {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pop: number;
  pressure: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: Weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
};

export type Minutely = {
  dt: number;
  precipitation: number;
};
