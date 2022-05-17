import {
  getWindDirection,
  getKmFromMts,
  getKmPerHours,
} from "../../utils/hightlightsFormatter";

import Direction from "../icons/Direction";

import styles from "../../styles/Hightlights.module.css";

export default function TodayHightlights({
  windSpeed,
  windDeg,
  humidity,
  visibility,
  pressure,
}) {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Destacados de hoy</h4>
      <div className={styles.card}>
        <p className={styles.cardTitle}>Estado del viento</p>
        <p className={styles.cardData}>
          {getKmPerHours(windSpeed)}
          <span className={styles.symbol}>km/h</span>
        </p>
        <p className={styles.windDirection}>
          <i style={{ transform: `rotate(${windDeg}deg)` }}>
            <Direction />
          </i>
          {getWindDirection(windDeg)}
        </p>
      </div>
      <div className={styles.card}>
        <p className={styles.cardTitle}>Humedad</p>
        <p className={styles.cardData}>
          {humidity}
          <span className={styles.symbol}>%</span>
        </p>
        {
          // TODO slider
          <div className={styles.sliderWrapper}>
            <div className={styles.sliderLabels}>
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
            <div className={styles.sliderContent}>
              <span
                className={styles.sliderLine}
                style={{ width: `${humidity}%` }}
              />
            </div>
          </div>
        }
      </div>
      <div className={styles.card}>
        <p className={styles.cardTitle}>Visibilidad</p>
        <p className={styles.cardData}>
          {getKmFromMts(visibility)}
          <span className={styles.symbol}>km</span>
        </p>
      </div>
      <div className={styles.card}>
        <p className={styles.cardTitle}>Presión del aire</p>
        <p className={styles.cardData}>
          {pressure}
          <span className={styles.symbol}>hPa</span>
        </p>
      </div>
    </div>
  );
}
