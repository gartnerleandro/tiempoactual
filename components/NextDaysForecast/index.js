import Image from 'next/image';

import { iconImages } from '../../utils/constants';
import { getFormatedDate } from '../../utils/dateFormatter';

import styles from '../../styles/Forecast.module.css';

const CardElement = ({ dt, index, weather, temp }) => (
  <div className={styles.card}>
    <p className={styles.title}>{getFormatedDate(dt, index)}</p>
    <Image src={`${iconImages[weather[0].main]}`} width="60px" height="60px" objectFit="contain" />
    <div className={styles.temperature}>
      <span className={styles.maxTemp}>{`${temp.max.toFixed()} ºC`}</span>
      <span className={styles.minTemp}>{`${temp.min.toFixed()} ºC`}</span>
    </div>
  </div>
);

export default ({data}) => {

  return (
    <div className={styles.container}>
      {data.map((item, index) => <CardElement key={item.dt} {...item} index={index} />)}
    </div>
  )
}