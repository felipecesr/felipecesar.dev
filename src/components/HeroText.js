import styled from "styled-components";
import media from "styled-media-query";

export default styled.p`
  font-size: 1.25rem;

  & + p {
    margin-top: 1.45rem;
  }

  ${media.greaterThan("medium")`
  font-size: 1.4rem;
`}

  ${media.greaterThan("large")`
  font-size: 1.7rem;
`}
`;
