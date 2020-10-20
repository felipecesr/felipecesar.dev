import styled from "styled-components";
import media from "styled-media-query";

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding-right: 1.5rem;
  padding-left: 1.5rem;

  ${media.greaterThan("medium")`
    padding-right: 2rem;
    padding-left: 2rem;
  `}
`;

export const Wrapper = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;
