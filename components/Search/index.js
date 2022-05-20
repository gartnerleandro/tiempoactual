import InputSearch from "./Input";
import Close from "../icons/Close";

import styles from "../../styles/Search.module.css";

export default function Search({ isOpen, onClose, onSelect }) {
  return (
    <div className={`${styles.container} ${isOpen && styles.open}`}>
      <button className={styles.close} onClick={onClose}>
        <Close />
      </button>
      <InputSearch onSelectCity={onSelect} />
    </div>
  );
}
