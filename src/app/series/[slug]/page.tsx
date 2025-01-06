import { getBlogPosts } from "@/lib/content";
import BlogPosts from "@/components/posts";

export async function generateStaticParams() {
  const posts = getBlogPosts("content/series");

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const Serie = async ({ params }) => {
  const { slug } = await params;
  const post = getBlogPosts("content/series").find(
    (post) => post.slug === slug
  );

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="prose dark:prose-invert">
      <h2 className="">{post.metadata.title}</h2>
      <p>{post.metadata.description}</p>
      <BlogPosts serie={slug} />
    </article>
  );
};

export default Serie;
