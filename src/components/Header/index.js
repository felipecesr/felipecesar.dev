import * as S from "./styles";

export default function Header() {
  return (
    <S.Header>
      <S.SkipLink href="#main">Skip to main</S.SkipLink>
      <S.Wrapper>
        <S.Title>Felipe César</S.Title>
        <S.Text>Hey, ich bin Arya.</S.Text>
        <S.Text>
          Ich bin eine in Winterfell lebende Frontend Entwicklerin, die versucht
          Leute mit dem spitzen Ende abzustechen. Vorher war ich ahnungslos,
          hatte aber die Ehre Jaqen H'ghar zu treffen.
        </S.Text>
        <S.List>
          <S.ListItem>
            <a href="/">Github</a>
          </S.ListItem>
          <S.ListItem>
            <a href="/">Twitter</a>
          </S.ListItem>
          <S.ListItem>
            <a href="/">Linkedin</a>
          </S.ListItem>
        </S.List>
      </S.Wrapper>
    </S.Header>
  );
}
