import Link from "next/link";

export default function Card({ slug, title, excerpt, date }) {
  return (
    <Link href={slug}>
      <a>
        <h2>{title}</h2>
        <p>{excerpt}</p>
        <p>{date}</p>
      </a>
    </Link>
  );
}
