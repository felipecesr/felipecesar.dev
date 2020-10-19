import styled from "styled-components";
import media from "styled-media-query";

import { Container } from "styles/utils";

export const Header = styled.header`
  background-color: #111216;
  display: flex;
  align-items: center;
`;

export const SkipLink = styled.a`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;

  &:focus {
    padding: 1rem;
    position: fixed;
    top: 10px;
    left: 10px;
    background: #fff;
    z-index: 1;
    width: auto;
    height: auto;
    clip: auto;
  }
`;

export const Wrapper = styled(Container)`
  padding-top: 6rem;
  padding-bottom: 6rem;

  ${media.greaterThan("medium")`
    padding-top: 13rem;
    padding-bottom: 13rem;
  `}
`;

export const Title = styled.h1`
  font-size: 2.369rem;
  margin-bottom: 2rem;

  ${media.greaterThan("medium")`
    font-size: 3.157rem;
  `}
`;

export const Text = styled.p`
  font-size: 1.25rem;

  & + p {
    margin-top: 1.45rem;
  }

  ${media.greaterThan("medium")`
    font-size: 1.7rem;
  `}
`;

export const List = styled.ul`
  display: flex;
  list-style-type: none;
  margin-top: 2rem;
`;

export const ListItem = styled.li`
  font-size: 1.2rem;

  & + li {
    margin-left: 1.75rem;
  }

  ${media.greaterThan("medium")`
    font-size: 1.333rem;
  `}
`;
