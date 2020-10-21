import styled from "styled-components";
import media from "styled-media-query";

export default styled.ul`
  display: flex;
  font-family: "Source Code Pro", monospace;
  font-weight: 600;
  list-style-type: none;
  margin-top: 2rem;

  a {
    opacity: 0.5;
    text-decoration: none;

    &:hover {
      opacity: 1;
    }
  }

  li {
    font-size: 1.2rem;

    & + li {
      margin-left: 1.75rem;
    }

    ${media.greaterThan("medium")`
      font-size: 1.333rem;
    `}
  }
`;
