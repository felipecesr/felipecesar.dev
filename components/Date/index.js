import React from 'react'
import { parseISO, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import * as S from './styles'

const Date = ({ dateString }) => {
  const date = parseISO(dateString)
  return (
    <S.DateWrapper dateTime={dateString}>
      {format(date, 'LLLL	d, yyyy', { locale: ptBR })}
    </S.DateWrapper>
  )
}

export { Date }
