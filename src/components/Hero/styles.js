import styled from "styled-components";
import media from "styled-media-query";

export const Hero = styled.header`
  background-color: #111216;
  display: flex;
  align-items: center;

  h1 {
    font-size: 2.369rem;
    margin-bottom: 2rem;

    ${media.greaterThan("medium")`
      font-size: 3.157rem;
    `}
  }
`;
