import styled from 'styled-components'

export const Layout = styled.div`
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  padding: 2.625rem 1.3125rem;
`

export const Title = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: ${props => (props.isRoot ? '3.95285rem' : '1.4427rem')};
  line-height: ${props => (props.isRoot ? '4.375rem' : '1.1')};
  margin-bottom: ${props => (props.isRoot ? '2.625rem' : '-1.75rem')};
  margin-top: 0;

  > a {
    box-shadow: none;
    color: inherit;
  }
`
