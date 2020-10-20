import styled from "styled-components";
import { Container } from "styles/utils";

export const SkipLink = styled.a`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
  transition: all 0.4s ease-in-out 0s;

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

export const Footer = styled.footer`
  position: relative;
  padding-top: 6rem;

  &::before {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 490px;
    z-index: -1;
    background: linear-gradient(
      180deg,
      #1d2128 0%,
      rgba(66, 81, 98, 0.36) 100%
    );
  }
`;

export const Wrapper = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;
