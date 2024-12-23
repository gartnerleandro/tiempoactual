import { useState } from "react";

export default () => {
  const [weatherResults, setWeatherResults] = useState({});
  const [loadingWeather, setLoading] = useState(false);

  function getSelectedCityInfo(lat, lon) {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&lang=es&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherResults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        setLoading(false);
      });
  }

  return { getSelectedCityInfo, weatherResults, loadingWeather };
};
