import { useEffect, useState } from 'react';

export default () => {
  const [geolocation, setGeolocation] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    setGeolocation(navigator.geolocation);
  }, []);

  useEffect(() => {
    if (geolocation) {
      geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ latitude, longitude });
      });
    }
  }, [geolocation]);

  return { geolocation, currentPosition };
};
