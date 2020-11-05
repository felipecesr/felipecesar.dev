import { Header } from "components/Header";
import { Title } from "components/Title";
import { List } from "components/List";
import { getAllPosts } from "lib/api";

export default function Index({ allPosts }) {
  return (
    <>
      <Header />
      <main>
        <p>
          Oi, eu sou <strong>Felipe</strong>. Sou um Desenvolvedor Front-End,
          entusiasta JavaScript e apaixonado por boas práticas.
        </p>
        <Title>Últimos posts</Title>
        <List items={allPosts} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
}
