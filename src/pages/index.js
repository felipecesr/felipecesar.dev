import fs from "fs";

import heroStyles from "styles/components/Hero.module.scss";
import Main from "components/Main";
import titleStyles from "styles/components/Title.module.scss";
import List from "components/List";
import { container } from "styles/components/Container.module.scss";
import Social from "components/Social";
import { getAllPosts } from "lib/api";
import { generateRss } from "lib/rss";
import { heroInnerHome } from 'styles/components/HeroInner.module.scss'

export default function Index({ allPosts }) {
  return (
    <>
      <header className={heroStyles.hero}>
        <div className={`${container} ${heroInnerHome}`}>
          <h1>Felipe César</h1>
          <Social />
        </div>
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
