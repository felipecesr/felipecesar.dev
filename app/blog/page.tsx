import BlogPosts from "@/components/posts";

const Blog = () => {
  return (
    <div>
      <h2>Blog</h2>
      <input type="search" name="search" id="search" placeholder="Pesquisar" />
      <h3>Assuntos</h3>
      <a href="#">Testes</a>
      <a href="#">JavaScript</a>
      <BlogPosts />
    </div>
  );
};

export default Blog;
