import * as S from "./styles";

export default function Main({ children }) {
  return (
    <main id="main">
      <S.Wrapper>{children}</S.Wrapper>
    </main>
  );
}
