import styled from "styled-components";

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
`;

export const Date = styled.p`
  color: #595c62;
`;

export const Title = styled.h3`
  font-size: 1.777rem;
`;
