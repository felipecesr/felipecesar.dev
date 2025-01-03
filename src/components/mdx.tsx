import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import { createMermaidRenderer } from "@/lib/mermaid-isomorphic/mermaid-isomorphic";

async function Code({ children, ...props }) {
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

async function Svg({ data, ...props }) {
  try {
    const renderer = createMermaidRenderer();
    const results = await renderer([data]);
    const { value } = results.find((result) => result.status === "fulfilled");
    return <div dangerouslySetInnerHTML={{ __html: value.svg }} {...props} />;
  } catch (e) {
    console.log("data", data);
    throw new Error(e);
  }
}

const components = {
  code: Code,
  Svg: Svg,
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
