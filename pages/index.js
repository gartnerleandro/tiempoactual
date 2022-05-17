import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { format, fromUnixTime } from 'date-fns';
import { es } from 'date-fns/locale';

import LocationIcon from '../components/icons/Location';
import NextDaysForecast from '../components/NextDaysForecast';
import TodayHightlights from '../components/TodayHightlights';

import { iconImages } from '../utils/constants';

import useGeolocation from '../hooks/useGeolocation';
import useWeatherApi from '../hooks/useWeatherApi';

import styles from '../styles/Home.module.css';

export default function Home() {
  const {getSelectedCityInfo, weatherResults, loadingWeather} = useWeatherApi();
  const {geolocation, currentPosition, locationName} = useGeolocation();

  useEffect(() => {
    if (geolocation && currentPosition) {
      getSelectedCityInfo(currentPosition.latitude, currentPosition.longitude);
    }
  }, [geolocation]);

  return (
    <>
      <Head>
        <title>Tiempo Actual de tu ciudad</title>
        <meta name="description" content="Consulta el tiempo actual en tu ubicación en tiempo real" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.currentWeather}>
          {
            !loadingWeather &&
            weatherResults?.current?.weather && (
              <>
              <Image src={`${iconImages[weatherResults.current.weather[0].main]}`} width="200px" height="200px" objectFit="contain" />
              <h1 className={styles.title}>
                {weatherResults.current.temp.toFixed()}
                <i className={styles.degrees}>ºC</i>
              </h1>
              <h2 className={styles.weather}>{weatherResults.current.weather[0].description}</h2>
              <div className={styles.dateWrapper}>
                <span className={styles.today}>Hoy</span>
                <span className={styles.dateSeparator}/>
                <span className={styles.dateFormat}>{format(new Date(fromUnixTime(1652608382)), 'E, dd MMM', { locale: es })}</span>
              </div>
              <div className={styles.locationWrapper}>
                <LocationIcon />
                <h3 className={styles.location}>{locationName}</h3>
              </div>
              </>
            )
          }
        </div>
        <div className={styles.forecast}>
          { 
            !loadingWeather &&
            weatherResults?.daily && <NextDaysForecast data={weatherResults.daily.slice(1, 6)} />
          }
          { 
            !loadingWeather &&
            weatherResults?.current && <TodayHightlights {...weatherResults.current} />
          }
        </div>
      </main>
    </>
  )
}