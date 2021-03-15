import styles from "styles/components/Container.module.scss";

export default function Main({ children }) {
  return (
    <main id="main">
      <div className={styles.container + ' ' + styles['px-1']}>{children}</div>
    </main>
  );
}
