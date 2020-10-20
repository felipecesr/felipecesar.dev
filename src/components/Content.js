import styled from "styled-components";
import prism from "styles/prism";
import { Container } from "styles/utils";

export default styled(Container)`
  ${prism}

  padding-top: 6rem;
  padding-bottom: 6rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-bottom: 1.45rem;
  }

  h1 {
    font-size: 3.157rem;
  }

  h2 {
    font-size: 1.99326rem;
  }

  h3 {
    font-size: 1.58383rem;
  }

  h4 {
    font-size: 1rem;
  }

  h5 {
    font-size: 0.79459rem;
  }

  h6 {
    font-size: 0.7083rem;
  }

  p {
    margin-bottom: 1.45rem;
  }

  p,
  li {
    letter-spacing: -0.003em;
    --baseline-multiplier: 0.179;
    --x-height-multiplier: 0.35;
    font-size: 21px;
    line-height: 1.58;

    pre {
      padding: 0.2rem 0.5rem;
      margin: 0.5rem 0;
    }
  }

  blockquote {
    margin-left: 0;
    padding-left: 1.45rem;
    border-left: 2px solid #fff;

    p {
      font-size: 19px;
      font-style: italic;
    }
  }
`;
