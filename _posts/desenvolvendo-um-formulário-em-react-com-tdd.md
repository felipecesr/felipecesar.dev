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
    <label htmlFor='description'>Description</label>
    <input type='text' id='description' />
  </form>
)

export default Form
```