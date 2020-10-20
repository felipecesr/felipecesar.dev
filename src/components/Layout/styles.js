import styled from "styled-components";
import media from "styled-media-query";
import Container from "components/Container";

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
  padding-bottom: 2rem;
  font-family: "Source Code Pro", monospace;
  text-align: center;

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

  ${media.greaterThan("medium")`
    padding-bottom: 80px;
  `}
`;

export const Wrapper = styled(Container)`
  ${media.greaterThan("medium")`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255,255,255,0.15);
    padding-top: 50px;
    padding-left: 0;
    padding-right: 0;
  `}
`;

export const Copy = styled.p`
  margin-bottom: 100px;
  opacity: 0.5;

  ${media.greaterThan("medium")`
    margin-bottom: 0;
  `}
`;

export const Social = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;

  li {
    width: 40px;
    height: 40px;
    padding: 0.7em;

    ${media.greaterThan("medium")`
      padding-right: 0;
      padding-left: 1.4em;
    `}
  }

  a {
    display: block;
    opacity: 0.5;
    transition: opacity 0.3s ease 0s;

    &:hover {
      opacity: 1;
    }
  }

  svg {
    display: block;
    width: 100%;
  }
`;
