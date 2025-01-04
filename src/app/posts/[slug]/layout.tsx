const PostLayout = ({ children }) => (
  <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
    <div className="order-1 flex flex-col gap-2 lg:gap-8">
      {/* <h2 className="text-lg font-bold">Continue lendo</h2> */}
      <ul className="space-y-4">
        {/* {#each data.posts as post}
				<PostLink {post} href="/writing/{post.slug}" as="li" />
			{/each} */}
      </ul>
    </div>
    <div className="lg:col-span-3">{children}</div>
  </div>
);

export default PostLayout;
