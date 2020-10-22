import styled from "styled-components";
import media from "styled-media-query";

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
    background: #000;
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

export const Wrapper = styled.div`
  ${media.greaterThan("medium")`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(255,255,255,0.15);
    padding-top: 50px;
  `}
`;

export const Copy = styled.p`
  margin-bottom: 100px;
  opacity: 0.5;

  ${media.greaterThan("medium")`
    margin-bottom: 0;
  `}
`;
