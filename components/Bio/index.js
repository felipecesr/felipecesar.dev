import React from 'react'
import * as S from './styles'

const Bio = () => (
  <S.Bio>
    <S.ProfilePic src="https://via.placeholder.com/104" alt="Felipe César" />
    <p>
      Oi! Eu sou um desenvolvedor <strong>Front-End</strong> who lives and works
      in San Francisco building useful things.
      <a href="https://twitter.com/felipecesr">
        Você pode me seguir no Twitter
      </a>
    </p>
  </S.Bio>
)

export { Bio }
