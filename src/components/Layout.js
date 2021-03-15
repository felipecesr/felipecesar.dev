import styles from 'styles/components/Layout.module.scss'
import containerStyles from "styles/components/Container.module.scss";
import Social from "components/Social";

export default function Layout({ children }) {
  const year = new Date().getFullYear();

  return (
    <>
      <a className={styles.skipLink} href="#main">Skip to main</a>
      {children}
      <footer className={styles.footer}>
        <div className={`${containerStyles['container']} ${containerStyles['px-md-1']}`}>
          <div className={styles.layoutWrapper}>
            <p className={styles.copy}>© {year} - Felipe Cesar</p>
            <Social />
          </div>
        </div>
      </footer>
    </>
  );
}
