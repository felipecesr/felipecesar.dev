import { NextSeo } from "next-seo";
import styled from "styled-components";

import { getPostBySlug, getPostSlugs } from "lib/api";
import markdownToHtml from "lib/markdownToHtml";

import Hero from "components/Hero";
import Main from "components/Main";
import Content from "components/Content";
import { Container } from "styles/utils";

const Headline = styled.p`
  font-family: "Source Sans Pro", -apple-system, "BlinkMacSystemFont",
    "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol";
  color: #eee;
  font-size: 1.25rem;

  a {
    font-style: normal;
    font-weight: normal;
  }
`;

export default function Post({ title, date, excerpt, content }) {
  return (
    <>
      <NextSeo title={title} description={excerpt} />
      <Hero>
        <Container>
          <Headline>{date}</Headline>
          <h1>{title}</h1>
        </Container>
      </Hero>
      <main id="main">
        <Content dangerouslySetInnerHTML={{ __html: content }} />
      </main>
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
