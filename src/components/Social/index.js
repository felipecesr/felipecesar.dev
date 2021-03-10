import styles from './Social.module.scss'

export default function Social() {
  const socialNetworks = {
    Twitter: "https://twitter.com/felipecesr",
    Github: "https://github.com/felipecesr",
    LinkedIn: "https://www.linkedin.com/in/felipecesr/",
  };

  return (
    <ul className={styles.socialWrapper}>
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
