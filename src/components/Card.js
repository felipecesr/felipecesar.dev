import Link from "next/link";

export default function Card({ slug, title, excerpt, date }) {
  return (
    <Link href={slug}>
      <a>
        <h3>{title}</h3>
        <p>{excerpt}</p>
        <p>{date}</p>
      </a>
    </Link>
  );
}
