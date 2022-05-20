import styles from "../../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.createdby}>
        created by{" "}
        <a href="https://github.com/gartnerleandro">gartnerleandro</a> -
        devChallenges.io
      </p>
    </footer>
  );
}
