import Link from "next/link";
import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src="/img/photo.png" alt="Foto" />
      <div>
        <h1>Home</h1>
        <p>Hello World! This is the Home page</p>
        <p>
          Visit the <Link href="/about">About</Link> page.
        </p>
      </div>
    </header>
  )
}
