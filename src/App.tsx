import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import "./App.css";
import { getMeteoByLatLng } from "./Api/Meteo";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import dayjs from "dayjs";

import {
  clothingSuggestionsMen,
  clothingSuggestionsWomen,
} from "./Constant/suggestion";
import { Daily, Meteo } from "./Type/meteo.type";
import ForecastDay from "./Components/ForecastDay/ForecastDay";

function App() {
  const [meteo, setMeteo] = useState<Meteo>(null);
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [weatherType, setWeatherType] = useState<string>("");
  const [daySelected, setDaySelected] = useState<number>(0);
  const [dayName, setDayName] = useState<string>("Aujourd'hui");

  useEffect(() => {
    async function getMeteo() {
      if (lat !== 0 && lng !== 0) {
        const meteoData = await getMeteoByLatLng(lat, lng);
        setMeteo(meteoData);

        if (meteoData && meteoData.current.weather[0].main) {
          setWeatherType(meteoData.current.weather[0].main.toLowerCase());
        }
      }
    }

    getMeteo();
  }, [lat, lng]);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSelect = async (selected: string) => {
    setAddress(selected);

    try {
      const results = await geocodeByAddress(selected);
      const latLng = await getLatLng(results[0]);

      setLat(latLng.lat);
      setLng(latLng.lng);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleDaySelect = (index: number) => {
    if (meteo && meteo.daily && meteo.daily[index]) {
      const selectedDay = meteo.daily[index];
      setDaySelected(index);

      if (index === 0) {
        setDayName("Aujourd'hui");
      } else if (index === 1) {
        setDayName("Demain");
      } else {
        setDayName(dayjs(selectedDay.dt * 1000).format("DD/MM/YYYY"));
      }

      setWeatherType(selectedDay.weather[0].main.toLowerCase());

      setMeteo({
        ...meteo,
        current: {
          temp: selectedDay.temp.day,
          weather: selectedDay.weather,
          uvi: selectedDay.uvi,
          humidity: selectedDay.humidity,
          wind_speed: selectedDay.wind_speed,
          sunset: selectedDay.sunset,
          sunrise: selectedDay.sunrise,
          pressure: selectedDay.pressure,
          visibility: selectedDay.visibility,
        },
      });
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.background}>
        <video
          defaultPlaybackRate="0.3"
          autoPlay
          muted
          src={`${weatherType}.mp4`}
          loop
          id="myVideo"
        />
      </div>
      <div className={styles.container}>
        <div className={styles.meteo}>
          <div className={styles.meteo__header}>
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Rechercher une ville...",
                      className: styles.locationSearchInput,
                    })}
                  />
                  {suggestions.length > 0 && (
                    <div className={styles.autocompleteDropdownContainer}>
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? styles.suggestionItemActive
                          : styles.suggestionItem;

                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                            })}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </PlacesAutocomplete>
          </div>
          {meteo && meteo.current.weather[0].main && (
            <div className={styles.meteo__body}>
              <p className={styles.meteo__day}>{dayName}</p>
              <p className={styles.meteo__degree}>{meteo.current.temp}°C</p>

              <div className={styles.meteo__grid}>
                <div className={styles.meteo__icon}>
                  <img src="/season.png" width="32" height="32" />
                  {meteo.current.weather[0].description}
                </div>
                <div className={styles.meteo__icon}>
                  <img src="/uv-index.png" width="32" height="32" />
                  {meteo.current.uvi}
                </div>
                <div className={styles.meteo__icon}>
                  <img src="/humidity.png" width="32" height="32" />
                  {meteo.current.humidity}%
                </div>
                <div className={styles.meteo__icon}>
                  <img src="/wind-turbine.png" width="32" height="32" />
                  {meteo.current.wind_speed} km/h
                </div>
                <div className={styles.meteo__icon}>
                  <img src="/sunrise.png" width="32" height="32" />
                  {formatTime(meteo.current.sunrise)} -{" "}
                  {formatTime(meteo.current.sunset)}
                </div>
                <div className={styles.meteo__icon}>
                  <img src="/atmospheric.png" width="32" height="32" />
                  {meteo.current.pressure} hPa
                </div>
              </div>

              <p className={styles.suggestions}>
                {clothingSuggestionsMen[meteo.current.weather[0].main] &&
                  clothingSuggestionsMen[meteo.current.weather[0].main][
                    meteo.current.temp > 30
                      ? "Hot"
                      : meteo.current.temp > 20
                      ? "Warm"
                      : meteo.current.temp > 15
                      ? "Cool"
                      : "Cold"
                  ] &&
                  `Homme : ${
                    clothingSuggestionsMen[meteo.current.weather[0].main][
                      meteo.current.temp > 30
                        ? "Hot"
                        : meteo.current.temp > 20
                        ? "Warm"
                        : meteo.current.temp > 15
                        ? "Cool"
                        : "Cold"
                    ]
                  }`}
                <br />
                <br />
                {clothingSuggestionsWomen[meteo.current.weather[0].main] &&
                  clothingSuggestionsWomen[meteo.current.weather[0].main][
                    meteo.current.temp > 30
                      ? "Hot"
                      : meteo.current.temp > 20
                      ? "Warm"
                      : meteo.current.temp > 15
                      ? "Cool"
                      : "Cold"
                  ] &&
                  `Femme : ${
                    clothingSuggestionsWomen[meteo.current.weather[0].main][
                      meteo.current.temp > 30
                        ? "Hot"
                        : meteo.current.temp > 20
                        ? "Warm"
                        : meteo.current.temp > 15
                        ? "Cool"
                        : "Cold"
                    ]
                  }`}
              </p>
            </div>
          )}
          {meteo && meteo.daily && (
            <div className={styles.meteo__forecast}>
              <h2>Les prochains jours</h2>
              <div className={styles.forecastDays}>
                {meteo.daily.map((dayData: Daily, index: number) => (
                  <ForecastDay
                    key={index}
                    index={index}
                    dayData={dayData}
                    daySelected={daySelected}
                    handleDaySelect={handleDaySelect}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
