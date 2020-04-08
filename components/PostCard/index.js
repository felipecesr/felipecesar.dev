import React from 'react'
import * as S from './styles'

import { Date } from '../Date'

const PostCard = ({ link, text, date, excerpt }) => (
  <S.PostCardWrapper>
    <S.PostCardTitle>
      <a href={link}>{text}</a>
    </S.PostCardTitle>
    <Date dateString={date} />
    <p>{excerpt}</p>
  </S.PostCardWrapper>
)

export { PostCard }
