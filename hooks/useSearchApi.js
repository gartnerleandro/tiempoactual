import { useState } from 'react';

export default () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoading] = useState(false);

  function getSearchResults(city) {
    setLoading(true);
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}&lang=es`)
    .then((response) => response.json())
    .then((data) => {
      setSearchResults(data);
      setLoading(false);
    })
    .catch((err) => {
      console.warn(err);
      setLoading(false);
    });
  }

  return { getSearchResults, searchResults, loadingSearch };
};
