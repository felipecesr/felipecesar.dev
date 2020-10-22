import Link from "next/link";
import * as S from "./styles";

export default function List({ items }) {
  return (
    <S.List>
      {items.map((item, index) => (
        <S.ListItem key={index}>
          <S.Date>{item.date}</S.Date>
          <Link href={item.slug}>
            <a>{item.title}</a>
          </Link>
        </S.ListItem>
      ))}
    </S.List>
  );
}
