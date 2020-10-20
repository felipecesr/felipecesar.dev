import { css } from "styled-components";
import theme from "styles/theme";

const prism = css`
  code[class*="language-"],
  pre[class*="language-"] {
    color: #ccc;
    background: none;
    font-family: "Source Code Pro", Consolas, Menlo, Monaco, monospace;
    font-size: 14px;
    line-height: 1.375;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    tab-size: 4;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*="language-"] {
    padding: 1em;
    margin: 0.5em 0 2rem;
    overflow: auto;
  }

  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: #292c34;
    border-radius: 5px;
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  ${Object.keys(theme.prism.colors)
    .map((key) => {
      return `.token.${key}{color:${theme.prism.colors[key]};}`;
    })
    .join("")};

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .token.inserted {
    color: green;
  }

  .mdx-marker {
    width: 100%;
    display: block;
    margin-right: -1em;
    margin-left: -0.5em;
    padding-right: 1em;
    padding-left: 0.25em;
    border-left: 0.25em solid #007acc;
    background: linear-gradient(
      90deg,
      rgba(0, 122, 204, 0.39),
      rgba(0, 122, 204, 0.39) 61%,
      #2d2d2d
    ) !important;
  }
`;

export default prism;
