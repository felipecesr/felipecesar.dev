import { css } from "styled-components";

export default css`
  @font-face {
    font-family: "Lora";
    font-style: normal;
    font-weight: 400;
    src: url("/fonts/lora-v16-latin-regular.woff2") format("woff2");
  }

  @font-face {
    font-family: "Lora";
    font-style: normal;
    font-weight: 700;
    src: url("/fonts/lora-v16-latin-700.woff2") format("woff2");
  }

  @font-face {
    font-family: "Lora";
    font-style: italic;
    font-weight: 400;
    src: url("/fonts/lora-v16-latin-italic.woff2") format("woff2");
  }

  @font-face {
    font-family: "Source Code Pro";
    font-style: normal;
    font-weight: 400;
    src: local("Source Code Pro Regular"), local("SourceCodePro-Regular"),
      url("/fonts/source-code-pro-v13-latin-regular.woff2") format("woff2");
  }

  @font-face {
    font-family: "Source Code Pro";
    font-style: normal;
    font-weight: 600;
    src: local("Source Code Pro SemiBold"), local("SourceCodePro-SemiBold"),
      url("/fonts/source-code-pro-v13-latin-600.woff2") format("woff2");
  }
`;
