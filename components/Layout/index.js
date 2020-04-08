import React from 'react'
import { useRouter } from 'next/router'
import * as S from './styles'

const Layout = ({ children }) => {
  const router = useRouter()

  let rootPath = '/'

  const isRoot = router.pathname === rootPath

  return (
    <S.Layout>
      <S.Title isRoot={isRoot}>
        <a href="/">Felipe César</a>
      </S.Title>
      {children}
    </S.Layout>
  )
}

export { Layout }
