import React from 'react'
import ReactDisqusComments from 'react-disqus-comments'
import { siteMetadata } from '../../lib/config'
import * as S from './styles'

const Comments = ({ url, title }) => {
  const completeUrl = siteMetadata.siteUrl + '/' + url

  return (
    <S.CommentsWrapper>
      <hr />
      <h2>Comentários</h2>
      <ReactDisqusComments
        shortname="felipecesr"
        identifier={completeUrl}
        title={title}
        url={completeUrl}
      />
    </S.CommentsWrapper>
  )
}

export { Comments }
