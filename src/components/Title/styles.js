import styled from "styled-components";
import media from "styled-media-query";

export const Title = styled.h2`
  font-style: italic;
  font-size: 1.4444rem;
  position: relative;
  margin-top: 4rem;

  &::before {
    content: "";
    width: 1.5rem;
    left: -35px;
    height: 1px;
    background-color: #595c62;
    display: inline-block;
    position: absolute;
    top: 50%;

    ${media.greaterThan("medium")`
      width: 1.5rem;
      left: -40px;
    `}

    ${media.greaterThan("large")`
      width: 3rem;
      left: -80px;
    `}
  }
`;
