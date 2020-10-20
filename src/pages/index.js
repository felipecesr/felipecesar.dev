import { NextSeo } from "next-seo";
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
      <NextSeo title="Felipe Cesar" />
      <Hero>
        <HeroInner>
          <h1>Felipe Cesar</h1>
          <HeroText>Hey, ich bin Arya.</HeroText>
          <HeroText>
            Ich bin eine in Winterfell lebende Frontend Entwicklerin, die
            versucht Leute mit dem spitzen Ende abzustechen. Vorher war ich
            ahnungslos, hatte aber die Ehre Jaqen H'ghar zu treffen.
          </HeroText>
          <Social>
            <li>
              <a href="/">Twitter</a>
            </li>
            <li>
              <a href="/">Github</a>
            </li>
            <li>
              <a href="/">Linkedin</a>
            </li>
          </Social>
        </HeroInner>
      </Hero>
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
