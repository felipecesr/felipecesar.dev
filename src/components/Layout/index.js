import GlobalStyles from "styles/global";
import * as S from "./styles";

import Container from "components/Container";
import Social from "components/Social";

export default function Layout({ children }) {
  const year = new Date().getFullYear();

  return (
    <>
      <GlobalStyles />
      <S.SkipLink href="#main">Skip to main</S.SkipLink>
      {children}
      <S.Footer>
        <Container>
          <S.Wrapper>
            <S.Copy>© {year} - Felipe Cesar</S.Copy>
            <Social />
          </S.Wrapper>
        </Container>
      </S.Footer>
    </>
  );
}
