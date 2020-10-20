import GlobalStyles from "styles/global";
import * as S from "./styles";

export default function Layout({ children }) {
  const year = new Date().getFullYear();

  return (
    <>
      <GlobalStyles />
      <S.SkipLink href="#main">Skip to main</S.SkipLink>
      {children}
      <S.Footer>
        <S.Wrapper>© {year} - Felipe Cesar</S.Wrapper>
      </S.Footer>
    </>
  );
}
