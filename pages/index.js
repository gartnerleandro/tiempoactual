import Head from 'next/head'
import { useEffect } from 'react';

import Search from '../components/Search';

import useGeolocation from '../hooks/useGeolocation';
import useWeatherApi from '../hooks/useWeatherApi';

import styles from '../styles/Home.module.css';

export default function Home() {
  const {getSelectedCityInfo, weatherResults, loadingWeather} = useWeatherApi();
  const {geolocation, currentPosition} = useGeolocation();

  useEffect(() => {
    if (geolocation && currentPosition) {
      getSelectedCityInfo(currentPosition.latitude, currentPosition.longitude);
    } else {
      getSelectedCityInfo(39.5696, 2.6501);
    }
  }, [geolocation, currentPosition]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Tiempo Actual de tu ciudad</title>
        <meta name="description" content="Consulta el tiempo actual en tu ubicación en tiempo real" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Search onSelectCity={(lat, lon) => getSelectedCityInfo(lat,lon)} />
        {
          !loadingWeather &&
          weatherResults?.weather && (
            <>
            <img src={`http://openweathermap.org/img/wn/${weatherResults.weather[0].icon}@2x.png`} />
            <h1 className={styles.title}>
              {weatherResults.main.temp.toFixed()}
              <i className={styles.degrees}>ºC</i>
            </h1>
            <h3>{weatherResults.name}</h3>
            </>
          )
          }
      </main>
    </div>
  )
}