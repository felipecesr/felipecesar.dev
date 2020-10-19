import { NextSeo } from "next-seo";
import { getPostBySlug, getPostSlugs } from "lib/api";
import markdownToHtml from "lib/markdownToHtml";

export default function Post({ title, date, excerpt, content }) {
  return (
    <>
      <NextSeo title={title} description={excerpt} />
      <h1>{title}</h1>
      <p>{date}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
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
