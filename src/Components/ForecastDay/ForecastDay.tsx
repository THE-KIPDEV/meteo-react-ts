import styles from './ForecastDay.module.scss'; 
import dayjs from 'dayjs'; 
import { Daily } from "../../Type/meteo.type.ts";

type ForecastDayProps = {
  index: number;
  dayData: Daily;
  daySelected: number;
  handleDaySelect: (index: number) => void;
};

const ForecastDay = ({ index, dayData, daySelected, handleDaySelect }: ForecastDayProps) => {
  return (
    <div
      key={index}
      className={`${styles.forecastDay} ${
        index === daySelected ? styles.current : ""
      }`}
      onClick={() => handleDaySelect(index)}
    >
      <p className={styles.dayName}>
        {index === 0
          ? "Aujourd'hui"
          : index === 1
          ? "Demain"
          : dayjs(dayData.dt * 1000).format("DD/MM/YYYY")}
      </p>
      <p className={styles.dayTemp}>{dayData.temp.day}°C</p>

    </div>
  );
};

export default ForecastDay;