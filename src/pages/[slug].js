import { NextSeo } from "next-seo";
import { getPostBySlug, getPostSlugs } from "lib/api";
import markdownToHtml from "lib/markdownToHtml";

import Hero from "components/Hero";
import Main from "components/Main";
import { Container } from "styles/utils";

export default function Post({ title, date, excerpt, content }) {
  return (
    <>
      <NextSeo title={title} description={excerpt} />
      <Hero>
        <Container>
          <h1>{title}</h1>
        </Container>
      </Hero>
      <Main>
        <p>{date}</p>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Main>
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

  return { props: { title, date, content, excerpt } };
}
