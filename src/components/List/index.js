import Link from "next/link";
import * as S from "./styles";

export default function List({ items }) {
  return (
    <S.List>
      {items.map((item, index) => (
        <S.ListItem key={index}>
          <Link href={item.slug}>
            <a>
              <S.Date>{item.date}</S.Date>
              <S.Title>{item.title}</S.Title>
            </a>
          </Link>
        </S.ListItem>
      ))}
    </S.List>
  );
}
