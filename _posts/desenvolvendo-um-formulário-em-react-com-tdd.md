---
layout: default
title: Desenvolvendo um formulário em React com TDD
date: 2021-02-25T11:57:48.638Z
---
Neste artigo vamos desenvolver um formulário em React com TDD e React Testing Library.

## Escrevendo testes que falham

Vamos criar o arquivo `Form.test.js` e escrever o primeiro teste para o componente `Form`.

```javascript
import { render, screen } from '@testing-library/react'
import Form from '../Form'

test('renders a form with description, value, paid and a submit button', () => {
  render(<Form />)

  screen.getByLabelText(/description/i)
  screen.getByLabelText(/value/i)
  screen.getByLabelText(/paid/i)
  screen.getByRole('button', { name: /submit/i })
})
```

Após escrever o teste, podemos criar o componente `Form`.

```javascript
const Form = () => <Form />

export default Form
```

Quando executamos o código ele retorna o seguinte erro:

```bash
TestingLibraryElementError: Unable to find a label with the text of: /description/i

    <body>
      <div>
        <form />
      </div>
    </body>

       6 |   render(<Form />)
       7 |
    >  8 |   screen.getByLabelText(/description/i)
         |          ^
```

Note que quando utilizamos queries do tipo `getBy` e nenhum elemento é encontrado, um erro é retornado dizendo exatamente onde o teste quebrou.

## Fazendo o teste passar

Para que o teste passe, precisamos que ele encontre os elementos que estamos buscando na página.

No arquivo `Form.js` podemos adicionar o primeiro campo do formulário.

```javascript
const Form = () => (
  <form>
    <label htmlFor='description-input'>Description</label>
    <input type='text' id='description-input' />
  </form>
)

export default Form
```

Ao executar o teste novamente, veja que o erro mudou.

```bash
TestingLibraryElementError: Unable to find a label with the text of: /value/i

...

       7 |
       8 |   screen.getByLabelText(/description/i)
    >  9 |   screen.getByLabelText(/value/i)
         |          ^
      10 |   screen.getByLabelText(/paid/i)
      11 |   screen.getByRole('button', { name: /submit/i })
      12 |
```

Como é um processo repetitivo e para não deixar o artigo muito extenso vou adicionar os campos restantes de uma só vez.

```javascript
const Form = () => (
  <form>
    <label htmlFor='description-input'>Description</label>
    <input type='text' id='description-input' />

    <label htmlFor='value-input'>Value</label>
    <input type='text' id='value-input' />

    <label htmlFor='paid-input'>Paid</label>
    <input type='checkbox' id='paid-input' />

    <button type='submit'>Submit</button>
  </form>
)

export default Form
```

Se executarmos o teste novamente, podemos ver que ele está passando.

## Adicionando o evento Submit ao formulário

A próxima coisa que iremos fazer é desabilitar o botão após o clique e submeter o formulário.

Para isso, vamos criar uma `const` no teste para armazenar o botão e importar o `fireEvent` da Testing Library para executar o evento de clique, depois podemos verificar se o botão está desabilitado.

```javascript
import { render, screen, fireEvent } from '@testing-library/react'
import Form from '../Form'

test('renders a form with description, value, paid and a submit button', () => {
  render(<Form />)

  ...
  const buttonElement = screen.getByRole('button', { name: /submit/i })

  fireEvent.click(buttonElement)
  expect(buttonElement).toBeDisabled()
})
```

Se executarmos o código agora, além da falha esperada do teste, também foi retornado um erro no console.

```bash
Error: Not implemented: HTMLFormElement.prototype.submit
```

Esse erro ocorre porque quando clicamos no botão, o comportamento padrão é recarregar a página inteira, o Jest usa o js-dom por padrão e ele não tem esse comportamento implementado, por isso o erro.

Para que ele não ocorra mais, podemos implementar a função `handleSubmit`, adicionar o `e.preventDefault()` para remover esse comportamento e adicioná-la no evento `onSubmit` do formulário.

```javascript
const Form = () => {
  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
...
```

Agora quando executamos o teste, temos apenas a falha do teste.

```javascript
Received element is not disabled:
      <button type="submit" />

      12 |
      13 |   fireEvent.click(buttonElement)
    > 14 |   expect(buttonElement).toBeDisabled()
         |                         ^
```

Para que nosso teste volte a passar, precisamos desabilitar o botão após o clique, para fazer isso, vamos usar o hook `useState` para definir o estado do botão e alterar esse estado no evento do clique.

```javascript
import { useState } from 'react'

const Form = () => {
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setIsSaving(true)
  }

  ...

  <button type='submit' disabled={isSaving}>
    Submit
  </button>
```

Agora nosso teste voltou a passar.