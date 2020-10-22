import styled from "styled-components";
import media from "styled-media-query";

export const List = styled.ul`
  list-style-type: none;
  margin-top: 4rem;

  & + * {
    margin-top: 8rem;
  }
`;

export const ListItem = styled.li`
  & + li {
    margin-top: 1.45rem;
  }

  a {
    display: block;
    font-size: 1.777rem;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    ${media.greaterThan("medium")`
      font-size: 2.369rem;
    `}
  }
`;

export const Date = styled.p`
  color: #595c62;
  font-family: "Source Code Pro", monospace;
  font-weight: 600;
`;
