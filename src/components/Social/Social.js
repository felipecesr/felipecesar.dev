import styles from "./styles.module.scss";

export default function Social() {
  const socialNetworks = {
    Twitter: "https://twitter.com/felipecesr",
    Github: "https://github.com/felipecesr",
    LinkedIn: "https://www.linkedin.com/in/felipecesr/",
  };

  return (
    <ul className={styles.social}>
      {Object.keys(socialNetworks).map((key) => (
        <li key={key}>
          <a href={socialNetworks[key]} target="_blank" rel="noopener">
            {key}
          </a>
        </li>
      ))}
    </ul>
  );
}
