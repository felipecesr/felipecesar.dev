"use client";

import { DiscussionEmbed } from "disqus-react";

type Props = {
  slug: string;
  title: string;
};

const Disqus = ({ slug, title }: Props) => (
  <DiscussionEmbed
    shortname="felipecesar"
    config={{
      url: `https://felipecesar.dev/posts/${slug}`,
      identifier: slug,
      title,
      language: "pt_BR",
    }}
  />
);

export default Disqus;
