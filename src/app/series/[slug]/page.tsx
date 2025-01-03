import { getBlogPosts } from "@/app/posts/[slug]/utils";
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
  console.log(post);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.metadata.title}</h1>
      <p>{post.metadata.description}</p>
      <hr />
      <BlogPosts serie={post.metadata.slug} />
    </div>
  );
};

export default Serie;
