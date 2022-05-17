import { useEffect, useState } from "react";

import useSearchApi from "../../hooks/useSearchApi";

const FoundElement = ({ name, state, country, onSelectCity }) => (
  <button onClick={onSelectCity}>
    <h5>{`${name}, ${state}, ${country}`}</h5>
  </button>
);

export default function Search({ onSelectCity }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const { getSearchResults, searchResults, loadingSearch } = useSearchApi();

  useEffect(() => {
    let searchTimeout;

    if (city.length > 3) {
      setLoading(true);

      searchTimeout = setTimeout(() => {
        getSearchResults(city);
        setLoading(false);
      }, 3000);
    }
    return () => clearTimeout(searchTimeout);
  }, [city]);

  function onCityChange(e) {
    setCity(e.target.value);
  }

  function handleFocus() {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  }

  function handleResultClick({ lat, lon }) {
    onSelectCity(lat, lon);
    setShowResults(false);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Busca tu ciudad"
        onChange={onCityChange}
        onFocus={handleFocus}
      ></input>
      {(loading || loadingSearch) && <div>Cargando datos...</div>}
      {!loading &&
        !loadingSearch &&
        searchResults.length > 0 &&
        showResults &&
        searchResults.map((elem) => (
          <FoundElement
            key={elem.name}
            {...elem}
            onSelectCity={() => handleResultClick(elem)}
          />
        ))}
    </div>
  );
}
