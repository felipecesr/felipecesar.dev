import fs from "fs";
import styled from "styled-components";
import media from "styled-media-query";

import heroStyles from "components/Hero.module.scss";
import Main from "components/Main";
import titleStyles from "components/Title.module.scss";
import List from "components/List";
import containerStyles from "components/Container.module.scss";
import Social from "components/Social";
import { getAllPosts } from "lib/api";
import { generateRss } from "lib/rss";

const HeroInner = styled.div`
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
      <header className={heroStyles.hero}>
        <HeroInner className={containerStyles.container}>
          <h1>Felipe César</h1>
          <Social />
        </HeroInner>
      </header>
      <Main>
        <h2 className={titleStyles.title}>Últimos posts</h2>
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
