import { useState } from "react";

import SearchIcon from "../../icons/Search";

import useSearchApi from "../../../hooks/useSearchApi";

import styles from "../../../styles/SearchInput.module.css";

const FoundElement = ({ name, onSelectCity }) => (
  <button onClick={onSelectCity} className={styles.result}>
    <span>{name}</span>
  </button>
);

export default function SearchInput({ onSelectCity }) {
  const [city, setCity] = useState("");
  const { getSearchResults, searchResults, loadingSearch } = useSearchApi();

  function handleSearch() {
    getSearchResults(city);
  }

  function handleResultClick({ lat, lon, name }) {
    onSelectCity(lat, lon, name);
  }

  function handleChange(event) {
    setCity(event.target.value);
  }

  function handleKey(event) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div>
      <div className={styles.searchWrapper}>
        <div className={styles.inputWrapper}>
          <SearchIcon />
          <input
            type="text"
            placeholder="Busca una ciudad"
            onChange={handleChange}
            onKeyUp={handleKey}
            className={styles.input}
          ></input>
        </div>
        <button className={styles.searchButton} onClick={handleSearch}>
          Buscar
        </button>
      </div>
      {loadingSearch && <div className={styles.loading}>Cargando datos...</div>}
      {!loadingSearch && searchResults.length > 0 && (
        <div className={styles.results}>
          {searchResults.map((elem) => (
            <FoundElement
              key={elem.name}
              {...elem}
              onSelectCity={() => handleResultClick(elem)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
