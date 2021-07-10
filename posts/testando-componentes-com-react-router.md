---
layout: default
title: Testando componentes com React Router
date: 2020-06-12T13:07:14.596Z
---
## Refatorando

```jsx
test('main renders about and home and I can navigate to those pages', () => {
  const history = createMemoryHistory({initialEntries: ['/']})
  const {getByRole, getByText} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  expect(getByRole('heading')).toHaveTextContent(/home/i)
  fireEvent.click(getByText(/about/i))
  expect(getByRole('heading')).toHaveTextContent(/about/i)
})

test('landing on a bad page shows no match component', () => {
  const history = createMemoryHistory({
    initialEntries: ['/something-that-does-not-match'],
  })
  const {getByRole} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  expect(getByRole('heading')).toHaveTextContent(/404/i)
})
```

Temos algumas duplicações nos testes e podemos remover criando um custom render

```jsx
function render (ui, options = {}) {
  const history = createMemoryHistory({
    initialEntries: [options.route || '/'],
  })
  return rtlRender(
    <Router history={history}>
      {ui}
    </Router>, options)
}
```

Agora podemos refatorar os testes

```jsx
test('landing on a bad page shows no match component', () => {
  const {getByRole} = render(
    <Main />, {
      route: '/something-that-does-not-match',
  })
  expect(getByRole('heading')).toHaveTextContent(/404/i)
})
```

Nenhum dos testes está usando rerender, mas se estivessem? Teríamos um problema porque não temos acesso ao Router nem ao history para fazer o rerender corretamente.



```jsx
function render (ui, {route, ...renderOptions} = {}) {
  const history = createMemoryHistory({
    initialEntries: [route || '/'],
  })

  function Wrapper({children}) {
    return <Router history={history}>{children}</Router>
  }

  return rtlRender({ui}, {wrapper: Wrapper, ...renderOptions})
}
```
Dessa forma não precisamos mais passar o Router como primeiro argumento sempre que o render for chamado. Quando o rerender for chamado ele não vai rerenderizar o Wrapper, só rerenderiza o children.