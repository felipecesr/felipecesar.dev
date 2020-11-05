const generateRssItem = (post) => `
  <item>
    <guid>https://felipecesar.dev/${post.slug}</guid>
    <title>${post.title}</title>
    <link>https://felipecesar.dev/${post.slug}</link>
    <description>${post.excerpt}</description>
    <pubDate>${post.utcDate}</pubDate>
  </item>
`;

export const generateRss = (posts) => `
  <rss version="2.0" xmlns:atom="http://www.w3c.org/2005/Atom">
    <channel>
      <title>Blog - Felipe César</title>
      <link>https://felipecesar.dev</link>
      <description>Blog de um Desenvolvedor Front-End.</description>
      <language>pt-BR</language>
      <lastBuildDate>${posts[0].utcDate}</lastBuildDate>
      <atom:link href="https://felipecesar.dev/rss.xml" rel="self" type="application/rss+xml" />
      ${posts.map(generateRssItem).join("")}
    </channel>
  </rss>
`;
