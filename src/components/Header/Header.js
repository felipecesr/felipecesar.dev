import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./Header.module.scss";

const Header = () => {
  const router = useRouter();

  let rootPath = "/";

  const isRoot = router.pathname === rootPath;

  if (isRoot) {
    return (
      <header className={styles.header}>
        <h1>Felipe César</h1>
        <Image
          className={styles.avatar}
          src="/images/profile.jpg"
          alt="Felipe César avatar"
          width={120}
          height={120}
        />
      </header>
    );
  }

  return (
    <header className={styles["header--post"]}>
      <Image
        className={styles.avatar}
        src="/images/profile.jpg"
        alt="Felipe César avatar"
        width={120}
        height={120}
      />
      <Link href="/">
        <a aria-label="Back to Home">
          <h1>Felipe César</h1>
        </a>
      </Link>
    </header>
  );
};

export default Header;
