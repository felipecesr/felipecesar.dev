import { NextSeo } from "next-seo";
import Link from "next/link";
import styled from "styled-components";

import { getPostBySlug, getPostSlugs } from "lib/api";
import markdownToHtml from "lib/markdownToHtml";

import Hero from "components/Hero";
import Content from "components/Content";
import Comments from "components/Comments";
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

export const HeroInner = styled(Container)`
  padding-top: 1rem;
  padding-bottom: 4rem;
`;

export const Nav = styled.nav`
  display: block;
  padding-bottom: 2rem;
`;

export default function Post({ slug, title, date, excerpt, content }) {
  return (
    <>
      <NextSeo title={title} description={excerpt} />
      <Hero>
        <HeroInner>
          <Nav class="css-wbe2ly e12mfo420">
            <Link href="/">
              <a aria-label="Back to Home">Felipe Cesar</a>
            </Link>
          </Nav>
          <Headline>{date}</Headline>
          <h1>{title}</h1>
        </HeroInner>
      </Hero>
      <Container>
        <main id="main">
          <Content dangerouslySetInnerHTML={{ __html: content }} />
        </main>
        <Comments url={slug} title={title} />
      </Container>
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
