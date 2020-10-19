import * as S from "./styles";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <S.Footer>
      <S.Gradient />
      <S.Wrapper>© {year} - Felipe Cesar</S.Wrapper>
    </S.Footer>
  );
}
