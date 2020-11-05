import fs from "fs";
import styled from "styled-components";
import media from "styled-media-query";

import Hero from "components/Hero";
import Main from "components/Main";
import Title from "components/Title";
import List from "components/List";
import Container from "components/Container";
import Social from "components/Social";
import HeroText from "components/HeroText";
import { getAllPosts } from "lib/api";
import { generateRss } from "lib/rss";

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

export default function Index({ allPosts }) {
  return (
    <>
      <Hero>
        <HeroInner>
          <h1>Felipe César</h1>
          {/* <HeroText>
            <strong>Desenvolvedor Front-End</strong>, entusiasta JavaScript e
            apaixonado por boas práticas. Fiz esse blog para compartilhar
            artigos e dicas relacionados a desenvolvimento.
          </HeroText> */}
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
  const rss = generateRss(allPosts);

  fs.writeFileSync("./public/rss.xml", rss);

  return {
    props: { allPosts },
  };
}
