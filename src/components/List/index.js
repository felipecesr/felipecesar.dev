import Link from "next/link";
import styles from './List.module.scss'

export default function List({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li key={index} className={styles.listItem}>
          <p className={styles.date}>{item.date}</p>
          <Link href={item.slug}>
            <a>{item.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
