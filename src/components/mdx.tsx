import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import { createMermaidRenderer } from "@/lib/mermaid-isomorphic/mermaid-isomorphic";

async function Code({ children, ...props }) {
  if (props.className === "language-mermaid") {
    const renderer = createMermaidRenderer();
    const results = await renderer([children]);
    const svg = results[0].value.svg;
    return <div dangerouslySetInnerHTML={{ __html: svg }} {...props} />;
  }

  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

const components = {
  code: Code,
};

const CustomMDX = async (props) => {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
};

export default CustomMDX;
