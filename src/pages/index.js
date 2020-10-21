import styled from "styled-components";
import media from "styled-media-query";

import Hero from "components/Hero";
import Main from "components/Main";
import Title from "components/Title";
import List from "components/List";
import Container from "components/Container";
import Social from "components/Social";
import { getAllPosts } from "lib/api";

const HeroInner = styled(Container)`
  padding-top: 6rem;
  padding-bottom: 6rem;

  ul {
    margin-top: 2rem;
  }

  li {
    font-size: 1.2rem;

    ${media.greaterThan("medium")`
      font-size: 1.333rem;
    `}
  }

  ${media.greaterThan("medium")`
    padding-top: 8rem;
    padding-bottom: 8rem;
  `}

  ${media.greaterThan("large")`
    padding-top: 10rem;
    padding-bottom: 10rem;
  `}

  ${media.greaterThan("huge")`
    padding-top: 13rem;
    padding-bottom: 13rem;
  `}
`;

const HeroText = styled.p`
  font-size: 1.25rem;

  & + p {
    margin-top: 1.45rem;
  }

  ${media.greaterThan("medium")`
    font-size: 1.4rem;
  `}

  ${media.greaterThan("large")`
    font-size: 1.7rem;
  `}
`;

export default function Index({ allPosts }) {
  return (
    <>
      <Hero>
        <HeroInner>
          <h1>Felipe César</h1>
          <HeroText>Olá!</HeroText>
          <HeroText>
            Meu nome é Felipe César. Sou Desenvolvedor Frontend, fiz esse blog
            para compartilhar conhecimentos sobre assuntos estou estudando ou
            que considero importantes.
          </HeroText>
          <Social />
        </HeroInner>
      </Hero>
      <Main>
        <Title>Últimos posts</Title>
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
