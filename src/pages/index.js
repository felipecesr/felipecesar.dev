import { getAllPosts } from "lib/api";

import Header from "components/Header";
import Main from "components/Main";
import Title from "components/Title";
import Card from "components/Card";

export default function Index({ allPosts }) {
  return (
    <>
      <Header />
      <Main>
        <Title>Neue Posts</Title>
        <ul>
          {allPosts.map((post, index) => (
            <li key={index}>
              <Card {...post} />
            </li>
          ))}
        </ul>
      </Main>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts(["title", "slug", "excerpt", "date"]);

  return {
    props: { allPosts },
  };
}
