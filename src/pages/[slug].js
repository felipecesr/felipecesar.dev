import { NextSeo } from "next-seo";
import Link from "next/link";

import { getPostBySlug, getPostSlugs } from "lib/api";
import markdownToHtml from "lib/markdownToHtml";
import containerStyles from "styles/components/Container.module.scss";
import contentStyles from "styles/components/Content.module.scss";

import heroStyles from "styles/components/Hero.module.scss";
import Comments from "components/Comments";
import navStyles from "styles/components/Nav.module.scss";
import headlineStyles from "styles/components/Headline.module.scss";
import heroInnerStyles from 'styles/components/HeroInner.module.scss'

export default function Post({ slug, title, date, excerpt, content }) {
  return (
    <>
      <NextSeo
        title={title}
        titleTemplate="%s | Felipe César"
        description={excerpt}
      />
      <header className={heroStyles.hero}>
        <div className={`${containerStyles.container} ${heroInnerStyles.heroInner}`}>
          <nav className={navStyles.nav}>
            <Link href="/">
              <a aria-label="Back to Home">Felipe César</a>
            </Link>
          </nav>
          <p className={headlineStyles.headline}>{date}</p>
          <h1>{title}</h1>
        </div>
      </header>
      <div className={containerStyles.container}>
        <main id="main">
          <div className={contentStyles.content} dangerouslySetInnerHTML={{ __html: content }} />
        </main>
        <Comments url={slug} title={title} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getPostSlugs().map((slug) => `/${slug.replace(/\.md$/, "")}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  let { title, date, content, excerpt } = getPostBySlug(slug);
  content = await markdownToHtml(content);

  return { props: { slug, title, date, content, excerpt } };
}
