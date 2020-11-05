import styles from "./styles.module.scss";
import { Social } from "components/Social";

export default function Layout({ children }) {
  const year = new Date().getFullYear();

  return (
    <>
      <a className={styles.skipLink} href="#main">
        Skip to main
      </a>
      {children}
      <footer className={styles.footer}>
        <div className={styles.wrapper}>
          <p className={styles.copy}>© {year} - Felipe Cesar</p>
          <Social />
        </div>
      </footer>
    </>
  );
}
