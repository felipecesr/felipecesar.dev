import { NextSeo } from "next-seo";

import { getPostBySlug, getPostSlugs } from "lib/api";
import markdownToHtml from "lib/markdownToHtml";

import { Header } from "components/Header";
import { Comments } from "components/Comments";

import styles from "styles/Content.module.scss";

export default function Post({ slug, title, date, excerpt, content }) {
  return (
    <>
      <NextSeo
        title={title}
        titleTemplate="%s | Felipe César"
        description={excerpt}
      />
      <Header />
      <main id="main">
        <h2>{title}</h2>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </main>
      <Comments url={slug} title={title} />
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
