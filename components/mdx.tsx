import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'

function Code({ children, ...props }) {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

const components = {
  code: Code,
}
 
const CustomMDX = (props) => {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />
}

export default CustomMDX
