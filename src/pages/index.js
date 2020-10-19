import { getAllPosts } from "lib/api";

import Card from "components/Card";

export default function Index({ allPosts }) {
  return (
    <>
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
