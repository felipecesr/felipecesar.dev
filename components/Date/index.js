import React from 'react'
import { parseISO, format } from 'date-fns'
import * as S from './styles'

const Date = ({ dateString }) => {
  const date = parseISO(dateString)
  return (
    <S.DateWrapper dateTime={dateString}>
      {format(date, 'LLLL	d, yyyy')}
    </S.DateWrapper>
  )
}

export { Date }
