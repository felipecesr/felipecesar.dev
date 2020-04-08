import React from 'react'
import * as S from './styles'

import { Date } from '../Date'

const PostCard = ({ link, text, date }) => (
  <S.PostCardWrapper>
    <S.PostCardTitle>
      <a href={link}>{text}</a>
    </S.PostCardTitle>
    <Date dateString={date} />
  </S.PostCardWrapper>
)

export { PostCard }
