import { useEffect, useState } from "react";

export default () => {
  const [geolocation, setGeolocation] = useState(null);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 39.5696,
    longitude: 2.6501,
  });
  const [locationName, setLocationName] = useState("Palma");

  useEffect(() => {
    if ("geolocation" in navigator) {
      setGeolocation(navigator.geolocation);
    }
  }, []);

  useEffect(() => {
    if (geolocation) {
      geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getLocationName(latitude, longitude);
        setCurrentPosition({ latitude, longitude });
      });
    }
  }, [geolocation]);

  function getLocationName(latitude, longitude) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setLocationName(data.name);
      });
  }

  return { geolocation, currentPosition, locationName, getLocationName };
};
