import { NextSeo } from "next-seo";
import { getAllPosts } from "lib/api";

import Header from "components/Header";
import Main from "components/Main";
import Title from "components/Title";
import List from "components/List";

export default function Index({ allPosts }) {
  return (
    <>
      <NextSeo title="Felipe Cesar" />
      <Header />
      <Main>
        <Title>Neue Posts</Title>
        <List items={allPosts} />
      </Main>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
}
