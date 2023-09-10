import { useState, useEffect } from "react";
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
  const [meteo, setMeteo] = useState<Meteo | null | undefined>(null);
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
          clouds: selectedDay.clouds,
          dew_point: selectedDay.dew_point,
          dt: selectedDay.dt,
          wind_deg: selectedDay.wind_deg,
        },
      });
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.background}>
        {weatherType !== "" && (
          <video
            autoPlay
            muted
            src={`${weatherType}.mp4`}
            loop
            id="myVideo"
          />
        )}
      </div>
      <div className={styles.container}>
        <svg
          width="150"
          height="100"
          viewBox="0 0 382 145"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="371" y="108" width="11" height="8" fill="#FCCB30" />
          <path
            d="M6.60511 116V28.7273H27.6989V65.6307H28.8494L57.6989 28.7273H82.5426L51.6051 67.6761L83.0966 116H57.8693L36.1364 81.696L27.6989 92.3494V116H6.60511ZM94.9645 116V50.5455H115.803V116H94.9645ZM105.405 42.9176C102.479 42.9176 99.9645 41.9517 97.8622 40.0199C95.7599 38.0597 94.7088 35.7017 94.7088 32.946C94.7088 30.2187 95.7599 27.8892 97.8622 25.9574C99.9645 23.9972 102.479 23.017 105.405 23.017C108.359 23.017 110.874 23.9972 112.947 25.9574C115.05 27.8892 116.101 30.2187 116.101 32.946C116.101 35.7017 115.05 38.0597 112.947 40.0199C110.874 41.9517 108.359 42.9176 105.405 42.9176ZM129.066 140.545V50.5455H149.691V61.7528H150.33C151.183 59.7642 152.39 57.8466 153.952 56C155.543 54.1534 157.56 52.6477 160.004 51.483C162.475 50.2898 165.43 49.6932 168.867 49.6932C173.413 49.6932 177.66 50.8864 181.609 53.2727C185.586 55.6591 188.796 59.3381 191.239 64.3097C193.683 69.2812 194.904 75.6165 194.904 83.3153C194.904 90.7301 193.725 96.9375 191.367 101.938C189.038 106.938 185.884 110.688 181.907 113.188C177.958 115.688 173.569 116.938 168.739 116.938C165.444 116.938 162.589 116.398 160.174 115.318C157.759 114.239 155.728 112.818 154.08 111.057C152.461 109.295 151.211 107.406 150.33 105.389H149.904V140.545H129.066ZM149.478 83.2727C149.478 86.7955 149.947 89.8636 150.884 92.4773C151.85 95.0909 153.228 97.1222 155.018 98.571C156.836 99.9915 159.009 100.702 161.538 100.702C164.094 100.702 166.268 99.9915 168.058 98.571C169.847 97.1222 171.197 95.0909 172.106 92.4773C173.043 89.8636 173.512 86.7955 173.512 83.2727C173.512 79.75 173.043 76.696 172.106 74.1108C171.197 71.5256 169.847 69.5227 168.058 68.1023C166.296 66.6818 164.123 65.9716 161.538 65.9716C158.981 65.9716 156.808 66.6676 155.018 68.0597C153.228 69.4517 151.85 71.4403 150.884 74.0256C149.947 76.6108 149.478 79.6932 149.478 83.2727Z"
            fill="white"
          />
          <path
            d="M242.028 68.5391C241.729 65.7479 240.472 63.5746 238.256 62.0192C236.062 60.4638 233.207 59.6861 229.691 59.6861C227.219 59.6861 225.099 60.0589 223.331 60.8047C221.563 61.5504 220.21 62.5625 219.272 63.8409C218.335 65.1193 217.855 66.5788 217.834 68.2195C217.834 69.5831 218.143 70.7656 218.761 71.767C219.4 72.7685 220.263 73.6207 221.349 74.3239C222.436 75.0057 223.64 75.581 224.961 76.0497C226.282 76.5185 227.614 76.9126 228.956 77.2322L235.092 78.7663C237.564 79.3416 239.94 80.1193 242.219 81.0994C244.521 82.0795 246.577 83.3153 248.388 84.8068C250.22 86.2983 251.669 88.0987 252.734 90.2081C253.8 92.3175 254.332 94.7891 254.332 97.6229C254.332 101.458 253.352 104.835 251.392 107.754C249.432 110.652 246.598 112.921 242.891 114.562C239.205 116.181 234.741 116.991 229.499 116.991C224.407 116.991 219.986 116.202 216.236 114.626C212.507 113.049 209.588 110.748 207.479 107.722C205.391 104.697 204.261 101.011 204.091 96.6641H215.756C215.927 98.9439 216.63 100.84 217.866 102.353C219.102 103.866 220.71 104.995 222.692 105.741C224.695 106.487 226.932 106.859 229.403 106.859C231.982 106.859 234.24 106.476 236.179 105.709C238.139 104.92 239.673 103.834 240.781 102.449C241.889 101.043 242.454 99.402 242.475 97.527C242.454 95.8224 241.953 94.4162 240.973 93.3082C239.993 92.179 238.619 91.2415 236.85 90.4957C235.103 89.7287 233.058 89.0469 230.714 88.4503L223.267 86.5327C217.876 85.1477 213.615 83.049 210.483 80.2365C207.372 77.4027 205.817 73.642 205.817 68.9545C205.817 65.098 206.861 61.7209 208.949 58.8232C211.058 55.9254 213.924 53.6776 217.546 52.0795C221.168 50.4602 225.27 49.6506 229.851 49.6506C234.496 49.6506 238.565 50.4602 242.06 52.0795C245.575 53.6776 248.335 55.9041 250.337 58.7592C252.34 61.593 253.374 64.853 253.438 68.5391H242.028ZM295.681 95.3537V66.9091H307.251V116H296.032V107.275H295.521C294.413 110.023 292.591 112.271 290.056 114.018C287.542 115.766 284.442 116.639 280.756 116.639C277.538 116.639 274.694 115.925 272.222 114.498C269.772 113.049 267.854 110.95 266.469 108.202C265.084 105.432 264.392 102.087 264.392 98.1662V66.9091H275.961V96.3764C275.961 99.4872 276.814 101.959 278.518 103.791C280.223 105.624 282.46 106.54 285.23 106.54C286.934 106.54 288.586 106.124 290.184 105.293C291.782 104.462 293.092 103.227 294.115 101.586C295.159 99.924 295.681 97.8466 295.681 95.3537ZM330.717 87.2358V116H319.148V66.9091H330.206V75.2507H330.781C331.911 72.5021 333.711 70.3182 336.183 68.6989C338.675 67.0795 341.754 66.2699 345.419 66.2699C348.807 66.2699 351.758 66.9943 354.272 68.4432C356.808 69.892 358.768 71.9908 360.153 74.7393C361.559 77.4879 362.251 80.8224 362.23 84.7429V116H350.661V86.5327C350.661 83.2514 349.808 80.6839 348.104 78.8303C346.42 76.9766 344.087 76.0497 341.104 76.0497C339.08 76.0497 337.28 76.4972 335.703 77.392C334.148 78.2656 332.923 79.5334 332.028 81.1953C331.154 82.8572 330.717 84.8707 330.717 87.2358Z"
            fill="white"
          />
          <rect
            x="3"
            y="122"
            width="101"
            height="28"
            rx="14"
            transform="rotate(-90 3 122)"
            fill="#84BA2C"
          />
          <path
            d="M121 33L117.841 35.7041L119.517 39.5104L115.495 40.5704L115.353 44.7274L111.269 43.9436L109.337 47.6271L106 45.1429L102.663 47.6271L100.731 43.9436L96.6468 44.7274L96.5052 40.5704L92.483 39.5103L94.159 35.7041L91 33L94.159 30.2959L92.483 26.4896L96.5053 25.4296L96.6468 21.2726L100.731 22.0564L102.663 18.3729L106 20.8571L109.337 18.3729L111.269 22.0564L115.353 21.2726L115.495 25.4296L119.517 26.4897L117.841 30.2959L121 33Z"
            fill="#F5C525"
          />
          <path
            d="M106 43C111.523 43 116 38.5228 116 33C116 27.4772 111.523 23 106 23C100.477 23 96 27.4772 96 33C96 38.5228 100.477 43 106 43Z"
            fill="#F8A805"
          />
        </svg>

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
