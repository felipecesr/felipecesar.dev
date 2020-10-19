import styled from "styled-components";

import { Container } from "styles/utils";

export const Footer = styled.footer`
  position: relative;
  padding-top: 6rem;
`;

export const Wrapper = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export const Gradient = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 490px;
  z-index: -1;
  background: linear-gradient(180deg, #1d2128 0%, rgba(66, 81, 98, 0.36) 100%);
`;
