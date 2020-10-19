import { getAllPosts } from "lib/api";

import Header from "components/Header";
import Card from "components/Card";

export default function Index({ allPosts }) {
  return (
    <>
      <Header />
      {allPosts.map((post, index) => (
        <Card key={index} {...post} />
      ))}
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(["title", "slug", "excerpt", "date"]);

  return {
    props: { allPosts },
  };
}
