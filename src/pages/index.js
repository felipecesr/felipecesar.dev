import { getAllPosts } from "lib/api";

import Header from "components/Header";
import Main from "components/Main";
import Title from "components/Title";
import List from "components/List";
import Footer from "components/Footer";

export default function Index({ allPosts }) {
  return (
    <>
      <Header />
      <Main>
        <Title>Neue Posts</Title>
        <List items={allPosts} />
      </Main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
}